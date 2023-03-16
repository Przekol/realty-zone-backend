import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CookieOptions } from 'express';

import { cookieOptions } from '@config';

import { CookiesNames, TokenData } from '@types';

@Injectable()
export class CookieService {
  setTokenInCookie(res: Response, name: CookiesNames, tokenData: TokenData, additionalOptions?: CookieOptions) {
    return res.cookie(name, tokenData.token, {
      ...cookieOptions,
      maxAge: tokenData.expiresIn * 1000,
      ...additionalOptions,
    });
  }

  clearCookie(res: Response, name: CookiesNames, additionalOptions?: CookieOptions): void {
    res.clearCookie(name, { ...cookieOptions, ...additionalOptions });
  }
}
