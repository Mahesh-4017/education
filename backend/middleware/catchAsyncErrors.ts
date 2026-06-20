import { Request, Response, NextFunction, RequestHandler } from 'express';

const catchAsyncErrors =
  <
    Req extends Request = Request,
    Res extends Response = Response,
    Next extends NextFunction = NextFunction
  >(
    theFunc: (req: Req, res: Res, next: Next) => Promise<any>
  ): RequestHandler =>
  (req, res, next) => {
    return Promise.resolve(theFunc(req as Req, res as Res, next as Next)).catch(next);
  };

export default catchAsyncErrors;
