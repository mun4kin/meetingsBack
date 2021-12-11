import { IsDefined, MinLength } from 'class-validator';
import { ILogin } from './login.types';


export class IReg extends ILogin {
  @IsDefined()
  @MinLength(3, { message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value' })
    firstName?:string;
  @IsDefined()
  @MinLength(3, { message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value' })
    secondName?:string;
  photo?:string;
}
