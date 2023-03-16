import { TokenOptions } from '@types';

export interface ValidTokenRequest {
  token: string;
  type: TokenOptions['tokenType'];
}
