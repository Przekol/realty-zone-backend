export interface TokenPayload {
  id: string;
}

export enum CookiesNames {
  AUTHENTICATION = 'Authentication',
}

export interface CookieTokenData {
  token: string;
  expiresIn: number;
}
