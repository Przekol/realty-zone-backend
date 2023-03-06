import { IsNotEmpty, IsString } from 'class-validator';

import { ValidTokenRequest } from '@types';

export class ValidTokenDto implements ValidTokenRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
