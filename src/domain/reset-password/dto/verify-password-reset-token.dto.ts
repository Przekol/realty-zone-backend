import { IsString, IsUUID } from 'class-validator';

import { VerifyPasswordResetTokenRequest } from '@types';

export class VerifyPasswordResetTokenDto implements VerifyPasswordResetTokenRequest {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;
}
