import { IsDefined, IsEmail } from 'class-validator';


export class ILogin {
  @IsDefined()
  @IsEmail()
    email?:string;
  @IsDefined()
    password?:string;
  userId?:number;
  isCreator?:boolean;
}
