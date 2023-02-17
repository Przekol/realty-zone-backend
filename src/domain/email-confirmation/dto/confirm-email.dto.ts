import { IsNotEmpty, IsString } from 'class-validator';

import { ConfirmEmailRequest } from '../../../types/email/email-request';

export class ConfirmEmailDto implements ConfirmEmailRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
