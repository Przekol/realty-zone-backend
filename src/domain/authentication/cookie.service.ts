import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CookieOptions } from 'express';

import { COOKIE_OPTIONS } from '@config';

import { CookiesNames } from './types';
import { TokenData } from '@providers/tokens/types';

@Injectable()
export class CookieService {
  setTokenInCookie(res: Response, name: CookiesNames, tokenData: TokenData, additionalOptions?: CookieOptions) {
    return res.cookie(name, tokenData.token, {
      ...COOKIE_OPTIONS,
      maxAge: tokenData.expiresIn * 1000, // Example: JWT_ACCESS_TOKEN_EXPIRATION_TIME=3600 => Expires in 1 hour (3600 seconds * 1000 milliseconds).
      ...additionalOptions,
    });
  }

  clearCookie(res: Response, name: CookiesNames, additionalOptions?: CookieOptions): void {
    res.clearCookie(name, { ...COOKIE_OPTIONS, ...additionalOptions });
  }
}
