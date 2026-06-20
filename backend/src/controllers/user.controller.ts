import { Request, Response } from "express";
import { User } from "../models/user.model";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Please provide all required fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "student",
    });

    const token = user.getJWTToken("7d");

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Please provide email and password" });
      return;
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    const token = user.getJWTToken("7d");

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: true, message: "User verified (placeholder)" });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: true, message: "Forgot password (placeholder)" });
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: true, message: "Reset password (placeholder)" });
};

export const tokenLogin = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: true, message: "Token login (placeholder)" });
};
