import { IsEmail, IsString } from 'class-validator';

import { CreateUserRequest } from '@types';

export class CreateUserDto implements CreateUserRequest {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  hashPwd: string;
}
