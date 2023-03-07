import { TokenOptions } from '@providers/tokens/types';

export interface ValidTokenRequest {
  token: string;
  tokenType: TokenOptions['tokenType'];
}
