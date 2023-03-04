import { IsString } from 'class-validator';

import { PasswordResetRequest } from '@types';

export class PasswordResetDto implements PasswordResetRequest {
  @IsString()
  newPassword: string;
}
