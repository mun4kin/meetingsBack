import { firstValueFrom } from 'rxjs';
import { isAdmin$ } from '../db/user.db';

import {Response,Request} from "express";



export async function Admin (request: Request, response: Response, next?: (err?: Error) => void) {

  if (request.body.userEmail) {
    !await firstValueFrom(isAdmin$(request.body.email), { defaultValue: undefined }) && next(new Error('423'));
  }

  next();
}
