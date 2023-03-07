import { IsNotEmpty, IsString } from 'class-validator';

import { TokenOptions } from '@providers/tokens/types';
import { ValidTokenRequest } from '@types';

export class ValidTokenDto implements ValidTokenRequest {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  type: TokenOptions['tokenType'];
}
