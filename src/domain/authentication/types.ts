export interface AuthenticationTokenPayload {
  id: string;
}

export interface ActivationTokenPayload {
  email: string;
}

export type TokenPayloads = ActivationTokenPayload | AuthenticationTokenPayload;

export enum CookiesNames {
  AUTHENTICATION = 'Authentication',
  REFRESH = 'Refresh',
}

export interface CookieTokenData {
  token: string;
  expiresIn: number;
}

interface TokenData {
  token: string;
  expiresIn: number;
}
export interface AuthenticationsTokens {
  authenticationToken: TokenData;
}
