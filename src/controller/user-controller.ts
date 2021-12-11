import {
  Body,
  Controller, JsonController, Post, UseBefore
} from 'routing-controllers';
import 'reflect-metadata';
import { IReg } from '../model/registration';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  allUsers$, registration$, userByEmail$
} from '../db/user-db';
import * as argon2 from 'argon2';
import { ILogin } from '../model/login';
import * as jwt from 'jsonwebtoken';
import { Authentication } from '../middleware/middleware';
import httpContext from 'express-http-context';

@Controller()
@JsonController('/users')
export class UserController {
// =======================================================================================================================================
  @Post('/login')
  async login ( @Body() data: ILogin) {
    let correctPassword = false;
    let currentUser:IReg = {};

    try {
      currentUser = await firstValueFrom(userByEmail$(data.email));
    } catch (e) {
      throw new Error('420');
    }
    correctPassword = await argon2.verify(currentUser.password, data.password);

    if (!correctPassword) {
      throw new Error('421');
    }

    currentUser.password = undefined;

    return {
      ...currentUser,
      token: UserController.generateJWT(currentUser),
    };

  }
  // =======================================================================================================================================
  @Post('/registration')
  async registration( @Body() data: IReg) {
    const passwordHashed = await argon2.hash(data.password);
    return await firstValueFrom(registration$(data, passwordHashed));
  }
  // =======================================================================================================================================
  @Post('/all')
  @UseBefore(Authentication)
  async sendAll( @Body() data: { search:string}) {
    const user = httpContext.get('userId');
    let result = [];

    if (!data.search) {
      return result;
    }

    try {
      result = await lastValueFrom(allUsers$(data.search, user));
    } catch (e) {}
    return result;
  }
  // =======================================================================================================================================

  private static generateJWT(user: ILogin) {
    const data = {
      userId: user.userId,
      email: user.email
    };
    const signature = 'super_strong_password';
    const expiration = '6h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
  }
}