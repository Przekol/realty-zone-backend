import { IsNotEmpty, IsString } from 'class-validator';

import { ValidTokenRequest, TokenOptions } from '@types';

export class ValidTokenDto implements ValidTokenRequest {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  type: TokenOptions['tokenType'];
}
