import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import { Admin } from "../models/admin.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export const setupInitialAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return next(new ErrorHandler("Admins already exist. Use standard creation.", 400));
    }
    const role = await Role.create({
      name: "Super Admin",
      permissions: [],
      createdBy: new mongoose.Types.ObjectId(),
    });
    const admin = await Admin.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: role._id,
    });
    role.createdBy = admin._id as mongoose.Types.ObjectId;
    await role.save();
    const token = admin.getJWTToken("10d");
    res.status(201).json({ success: true, token, admin });
  }
);

export const loginAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }
    const admin = await Admin.findOne({ email }).select("+password").populate("role");
    if (!admin) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const token = admin.getJWTToken("1d");
    res.status(200).json({ success: true, token, admin });
  }
);

export const createRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, permissions } = req.body;
    if (!name || !permissions) {
      return next(new ErrorHandler("Please provide role name and permissions", 400));
    }
    const role = await Role.create({
      name,
      permissions,
      createdBy: req.admin?.id,
    });

    res.status(201).json({ success: true, role });
  }
);

export const viewRoles = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = await Admin.findById(req.admin?.id);
    const query: any = { name: { $ne: "Super Admin" } };
    if (admin && admin.role) {
      query._id = { $ne: admin.role };
    }
    const roles = await Role.find(query).populate("createdBy", "name email");
    res.status(200).json({ success: true, roles });
  }
);

export const deleteRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }
    if (role.createdBy.toString() !== req.admin?.id) {
      return next(
        new ErrorHandler("Forbidden: You can only delete roles that you created", 403)
      );
    }

    await role.deleteOne();
    res.status(200).json({ success: true, message: "Role deleted successfully" });
  }
);

export const createUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    const user = await Admin.create({ name, email, password, role });
    res.status(201).json({ success: true, user });
  }
);

export const updateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const updateData = req.body;

    const user = await Admin.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({ success: true, user });
  }
);
export const updateRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.id;
    const updateData = req.body;
    const role = await Role.findByIdAndUpdate(roleId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!role) {
      return next(new ErrorHandler("Role not found", 404));
    }
    res.status(200).json({ success: true, role });
  }
);

export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await Admin.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  }
);
export const tokenAdminLogin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req?.admin?.id)
    const user = await Admin.findById({ _id: req?.admin?.id }).populate("role", "name permissions")
    if (!user) return next(new ErrorHandler('User not found', 400));
    res.status(200).json({
      success: true,
      adminUser: user,
    })
  }
)

import { permissions } from "../utils/permission";
export const getPermissions = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      permissions,
    });
  }
);
export const getAdminUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const superAdminRole = await Role.findOne({ name: "Super Admin" });
    const superAdminRoleId = superAdminRole ? superAdminRole._id : null;
    const query: any = { _id: { $ne: req.admin?.id } };
    if (superAdminRoleId) {
      query.role = { $ne: superAdminRoleId };
    }

    const users = await Admin.find(query).populate("role", "name permissions");
    res.status(200).json({
      success: true,
      adminUsers: users,
    });
  }
);
