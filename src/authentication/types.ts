export interface TokenPayload {
  id: string;
}

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
  refreshToken: TokenData;
}
