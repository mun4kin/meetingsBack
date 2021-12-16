import {
  Body,
  Controller, JsonController, Post, UseBefore
} from 'routing-controllers';
import 'reflect-metadata';

import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  allUsers$, registration$, userByEmail$
} from '../db/user.db';
import * as argon2 from 'argon2';

import * as jwt from 'jsonwebtoken';
import { Authentication } from '../middleware/midAuthentication';
import httpContext from 'express-http-context';
import { Admin } from '../middleware/midAdmin';
import {
  ILogin, IRegUser, IUser, IUserWithToken, TSearchUsers
} from '../model/user.types';
/**
 * @swagger
 * tags:
 *   - name: API functions
 *     description: >-
 *       User Controller
 * */
@Controller()
@JsonController('/users')
export class UserController {
  private async adminLogin(userEmail:string):Promise<IUser> {
    /** admin part*/
    const currentUser:IUser|undefined = await firstValueFrom(userByEmail$( userEmail ), { defaultValue: undefined });

    if (!currentUser) {
      throw new Error('424');
    }

    return currentUser;
  }


  // =======================================================================================================================================
  @Post('/login')
  @UseBefore(Admin)
  async login ( @Body() data: ILogin):Promise<IUserWithToken> {


    let currentUser:IUser|undefined = await firstValueFrom(userByEmail$( data.email ), { defaultValue: undefined });

    if (!currentUser) {
      throw new Error('420');
    }

    const correctPassword = await argon2.verify(currentUser.password, data.password);


    if (!correctPassword) {
      throw new Error('421');
    }

    // if user is admin
    data.userEmail && (currentUser = await this.adminLogin(data.userEmail));


    delete currentUser.password;

    return {
      ...currentUser,
      token: UserController.generateJWT(currentUser),
    };

  }
  // =======================================================================================================================================
  @Post('/registration')
  async registration( @Body() data: IRegUser):Promise<boolean> {
    const passwordHashed = await argon2.hash(data.password);
    return !!await lastValueFrom(registration$(data, passwordHashed));
  }
  // =======================================================================================================================================
  @Post('/all')
  @UseBefore(Authentication)
  async sendAll( @Body() data: { search:string}):Promise<TSearchUsers[]> {
    if (!data.search) {
      return [];
    }

    return await lastValueFrom(allUsers$(data.search, httpContext.get('userId')), { defaultValue: [] });
  }
  // =======================================================================================================================================

  private static generateJWT(user: IUser):string {
    const data = {
      userId: user.userId,
      email: user.email
    };
    const signature = 'super_strong_password';
    const expiration = '6h';

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  }
}
