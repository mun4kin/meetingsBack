import httpContext from 'express-http-context';
import { JwtPayload, verify } from 'jsonwebtoken';
import {Response,Request} from "express";

export function Authentication (request: Request, response: Response, next?: (err?: Error) => void): void {
  try {

    const resultAuth = verify(request.headers.authorization.replace('Bearer ', ''), 'super_strong_password') as JwtPayload;

    httpContext.set('userId', resultAuth.data.userId);
    console.log("Authentication")
    next();
  } catch (e) {
    throw new Error('422');
  }
}
