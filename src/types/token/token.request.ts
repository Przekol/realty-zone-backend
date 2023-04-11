import { TokenOptions } from './token';

export type ValidTokenRequest = {
  token: string;
  type: TokenOptions['tokenType'];
};
