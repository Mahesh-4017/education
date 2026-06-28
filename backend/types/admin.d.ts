import { Request } from 'express';

declare global {
  namespace Express {
    interface Admin {
      id?: string;
    }

    interface Request {
      admin?: Admin;
    }
  }
}

export {};
