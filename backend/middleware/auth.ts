import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";



export const authMiddleware = catchAsyncErrors(async (
    req,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ErrorHandler("No token provided", 401));
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return next(new ErrorHandler("JWT_SECRET is not defined in environment variables", 500));
        }
        const decoded= jwt.verify(token, secret) as {id:string};
        req.user = decoded;
        next();
    } catch (err: any) {
        console.error("JWT verification failed:", err.message);
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});