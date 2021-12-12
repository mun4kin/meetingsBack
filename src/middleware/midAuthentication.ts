import httpContext from 'express-http-context';
import { JwtPayload, verify } from 'jsonwebtoken';

export function Authentication (request: any, response: any, next?: (err?: any) => any): any {
  try {
    const resultAuth = verify(request.headers.authorization, 'super_strong_password') as JwtPayload;
    httpContext.set('userId', resultAuth.data.userId);
    next();
  } catch (e) {
    throw new Error('422');
  }
}
