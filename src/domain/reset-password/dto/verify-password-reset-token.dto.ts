import { IsString, IsUUID } from 'class-validator';

export class VerifyPasswordResetTokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;
}
