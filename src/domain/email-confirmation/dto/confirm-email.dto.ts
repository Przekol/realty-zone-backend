import { IsNotEmpty, IsString } from 'class-validator';

import { ConfirmEmailRequest } from '@types';

export class ConfirmEmailDto implements ConfirmEmailRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
