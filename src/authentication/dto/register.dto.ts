import { IsEmail, IsString } from 'class-validator';
import { RegisterUserRequest } from '../../../@types';

export class RegisterDto implements RegisterUserRequest {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
