import httpContext from 'express-http-context';
import { JwtPayload, verify } from 'jsonwebtoken';

export function Authentication (request: any, response: any, next?: (err?: any) => any): any {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  try {
    const resultAuth = verify(request.headers.authorization.replace('Bearer ', ''), 'super_strong_password') as JwtPayload;
    httpContext.set('userId', resultAuth.data.userId);
    next();
  } catch (e) {
    throw new Error('422');
  }
}
