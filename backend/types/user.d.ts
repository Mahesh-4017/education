import { Request } from 'express';
declare global {
  interface RegisterUserBody {
    name: string;
    email: string;
    password: string;
    dob: string;
    zodiac: string;
    bt: string;
    bp: string;
  }

  namespace Express {
    interface User {
      id?: string;     // keep if you use it somewhere
    }

    interface Request {
      user?: User;
      file?: {
        filename: string;
      };
    }
  }
  interface LoginBody {
    email: string;
    password: string;
  }
  interface WalletRechargeBody {
    userId: string;
    rechargeId: string;

  }
  interface VerifyUserBody {
    token: string;
    otp: string;
  }
  interface ForgotPasswordBody {
    email: string;
    password: string;
  }
  interface ResetPasswordBody {
    token: string;
    otp: string
  }

  type RegisterUserRequest = Request<{}, {}, RegisterUserBody>;
  type VerifyUserRequest = Request<{}, {}, VerifyUserBody>;
  type ForgotPasswordRequest = Request<{}, {}, ForgotPasswordBody>;
  type ResetPasswordRequest = Request<{}, {}, ResetPasswordBody>;
  type LoginRequest = Request<{}, {}, LoginBody>;
  type TokenRequest = Request<{}, {}, TokenBody>;
  type WalletRechargeRequest = Request<{}, {}, WalletRechargeBody>;
  type AstrologerProfileUpdate = {
    displayName: string;
    experienceYears: number;
    languages: string[];
    username?: string;
    avatar?: { url: string };
  };
}

export { };
