import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

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
  error (error: any, request: any, response: any, next: () => any) {
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
