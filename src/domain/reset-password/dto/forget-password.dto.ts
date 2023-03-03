import { IsEmail } from 'class-validator';

import { ForgetPasswordRequest } from '@types';

export class ForgetPasswordDto implements ForgetPasswordRequest {
  @IsEmail()
  email: string;
}
