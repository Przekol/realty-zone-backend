import { IsEmail, IsString } from 'class-validator';

import { RegisterUserRequest } from '@types';

export class RegisterDto implements RegisterUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
