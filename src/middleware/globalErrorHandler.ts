import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

const errors:Record<string, string> = {
  '23505': 'User already exists. Please change e-mail.',
  '420': 'Unknown user e-mail',
  '421': 'Incorrect password',
  '422': 'User is unauthorized',
  '0': 'Server error, try to repeat your request later.'
};


@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    const frontendText = errors[error.code] || errors[error.message] || errors[0];
    console.error(error);
    response.status(500).json({
      ...error,
      detail: error?.detail || frontendText
    });
    next();
  }
}
