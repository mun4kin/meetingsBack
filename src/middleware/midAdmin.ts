import { firstValueFrom } from 'rxjs';
import { isAdmin$ } from '../db/user.db';

export async function Admin (request: any, response: any, next?: (err?: any) => any) {

  if (request.body.userEmail) {
    !await firstValueFrom(isAdmin$(request.body.email), { defaultValue: undefined }) && next(new Error('423'));
  }

  next();
}
