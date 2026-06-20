export default class ErrorHandler extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Maintains proper stack trace (only available on V8)
    Error.captureStackTrace(this, this.constructor);
  }
}