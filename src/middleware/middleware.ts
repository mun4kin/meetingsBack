import httpContext from 'express-http-context';
import { verify } from 'jsonwebtoken';
export function Authentication (request: any, response: any, next?: (err?: any) => any): any {
  try {
    const t = verify(request.headers.authorization, 'super_strong_password');

    // todo
    // @ts-ignore
    httpContext.set('userId', t.data.userId);
    next();
  } catch (e) {
    throw new Error('422');
  }
}


export function loggingAfter (request: any, response: any, next?: (err?: any) => any): any {
  console.log('do something After...');
  console.log(`tracedId = ${httpContext.get('traceId')}`);
  next();
}
