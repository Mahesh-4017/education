import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import { Admin } from "../models/admin.model";
import { Role } from "../models/role.model";

export const adminAuthMiddleware = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ErrorHandler("No token provided", 401));
      }

      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return next(
          new ErrorHandler("JWT_SECRET is not defined in environment variables", 500)
        );
      }
      const decoded = jwt.verify(token, secret) as { id: string };

      const admin = await Admin.findById(decoded.id);
      if (!admin) {
        return next(new ErrorHandler("Admin not found", 401));
      }

      req.admin = { id: admin.id };
      next();
    } catch (err: any) {
      console.error("JWT verification failed:", err.message);
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  }
);

export const hasPermission = (requiredPermission: string) => {
  return catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.admin || !req.admin.id) {
        return next(new ErrorHandler("Unauthorized admin", 401));
      }
      const admin = await Admin.findById(req.admin.id).populate("role");
      if (!admin || !admin.role) {
        return next(new ErrorHandler("Admin role not found", 403));
      }
      const role = await Role.findById(admin.role);
      if (!role) {
        return next(new ErrorHandler("Role not found", 403));
      }
      if (role.name === "Super Admin") {
        return next();
      }
      if (!role.permissions.includes(requiredPermission)) {
        return next(
          new ErrorHandler(
            `Forbidden: You don't have permission to ${requiredPermission}`,
            403
          )
        );
      }
      next();
    }
  );
};
