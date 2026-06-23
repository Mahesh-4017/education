import catchAsyncErrors from '../middleware/catchAsyncErrors';
import { User } from '../models/user.model';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorhandler';
import { NextFunction, Response } from 'express';
import { Otp } from '../models/otp.model';
import { TempPass } from '../models/tempPass';
export const registerUser = catchAsyncErrors(
    async (req: RegisterUserRequest, res: Response, next: NextFunction) => {
        const { name, password, email } = req.body;
        let user = await User.findOne({ email });
        if (user && user.verify) return next(new ErrorHandler('This email is already used', 400));
        const otp = Math.floor(1000 + Math.random() * 9000);
        if (!user) user = await User.create({ email, name, password });
        else {
            user.set({ email, name, password });
            await user.save();
        }
        await Otp.findOneAndUpdate(
            { _id: user._id },
            { otp },
            { upsert: true, new: true }
        );
        const token = user.getJWTToken("5M");
        const html = `Your OTP for email verification is: <b>${otp}</b>`;
        sendEmail({
            email: email,
            html,
            subject: "Verify Your Email Address - OTP"
        })
        res.status(200).json({
            success: true,
            token
        });
    }
);
export const verifyUser = catchAsyncErrors(
    async (req: VerifyUserRequest, res: Response, next: NextFunction) => {
        const { otp, token } = req.body;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        if (!verifyToken) return next(new ErrorHandler('Session is Expired', 401));
        const OTP = await Otp.findById({ _id: verifyToken.id, otp: otp });
        if (!OTP) return next(new ErrorHandler('OTP is expired or incorect OTP, Please try again', 400));
        const user = await User.findById(verifyToken.id)
        if (!user) return next(new ErrorHandler('User not found', 400));
        user.verify = true
        await user.save()
        const accessToken = user.getJWTToken("1Y");
        res.status(200).json({
            success: true,
            user,
            token: accessToken
        });
    }
);
export const login = catchAsyncErrors(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { email: c, password: p } = req.body
    let user = await User.findOne({ email: c }).select("+password")
    if (!user) return next(new ErrorHandler('Invalid email', 401));
    const isPasswordMatched = await user.comparePassword(p);
    if (!isPasswordMatched) return next(new ErrorHandler('Invalid password', 401));
    const token = user.getJWTToken("1Y");
    user.save()
    res.status(200).json({
        success: true,
        user,
        token
    })
})
export const tokenLogin = catchAsyncErrors(async (req: TokenRequest, res: Response, next: NextFunction) => {
    const { token } = req.body
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!verifyToken) return next(new ErrorHandler('Session is Expired', 401));
    const user = await User.findById({ _id: verifyToken.id })
    if (!user) return next(new ErrorHandler('User not found', 400));
    res.status(200).json({
        success: true,
        user,
    })
})
export const forgotPassword = catchAsyncErrors(async (req: ForgotPasswordRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    let user = await User.findOne({ email });
    if (!user || !user.verify) return next(new ErrorHandler('This email is not exist, Please enter right email', 400));
    const otp = Math.floor(1000 + Math.random() * 9000);
    await TempPass.findOneAndUpdate(
        { _id: user._id },
        { otp, tempPass: password },
        { upsert: true, new: true }
    )
    const token = user.getJWTToken("5M");
    const html = `
    <p>Your OTP for reset password is: <b>${otp}</b></p>
    <p>Your OTP will expire in 5 minutes.</p>
    <p>If you did not initiate this request, please ignore this email.</p>
    `
    sendEmail({
        email: email,
        html,
        subject: "Verify Your Email Address"
    })
    res.status(200).json({
        success: true,
        token
    })
})
export const resetPassword = catchAsyncErrors(async (req: ResetPasswordRequest, res: Response, next: NextFunction) => {
    const { token, otp } = req.body
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!verifyToken) return next(new ErrorHandler('Session is Expired', 401));
    const OTP = await TempPass.findById({ _id: verifyToken.id, otp: otp })
    if (!OTP) return next(new ErrorHandler('OTP is expired or incorect OTP, Please try again', 400));
    const user = await User.findById(OTP._id)
    if (!user) return next(new ErrorHandler('User not found', 400));
    user.password = OTP.tempPass
    await user.save()
    res.status(200).json({
        success: true,
    })
})
