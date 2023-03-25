import { IsEmail, IsString } from 'class-validator';

import { CreateUserRequest } from '@types';

export class CreateUserDto implements CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  hashPwd: string;
}
