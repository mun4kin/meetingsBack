import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import {Response,Request} from "express";

const errors:Record<string, string> = {
  '23505': 'User already exists. Please change e-mail.',
  '420': 'Unknown user e-mail',
  '423': 'You are not an administrator',
  '424': 'Unknown userEmail field',
  '421': 'Incorrect password',
  '422': 'User is unauthorized',
  '0': 'Server error, try to repeat your request later.'
};


@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: Error&{detail?:string,code?:number}, request: Request, response: Response, next: () => void) {
    const frontendText = errors[error.code] || errors[error.message] || errors[0];

    const t = !isNaN(+error.message) ? +error.message : 500;
    response.status(t).json({
      ...error,
      detail: frontendText,
      datailOld: error?.detail
    });
    next();
  }
}
