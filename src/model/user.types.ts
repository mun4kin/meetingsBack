import { IsDefined, IsEmail } from 'class-validator';

export class ILogin {
    @IsDefined()
    @IsEmail()
      email:string;
    @IsDefined()
      password:string;
    userEmail?:string;
}


export class IUser extends ILogin {

  firstName:string;
  isAdmin:boolean;
  photo:string;
  secondName:string;
  userId:number;
}


export interface IUserWithToken extends Omit<IUser, 'userEmail'|'password'> {
    token:string;
}
export type TSearchUsers = Omit<IUser, 'userEmail'|'password'|'isAdmin'>

export interface IRegUser extends Omit<IUser, 'isAdmin'|'userEmail'> {
    password:string;
}
export interface IMeetingsUser extends Omit<IUser, 'isAdmin'|'token'|'userEmail'|'password'> {
  isCreator:boolean;
}
