import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CookieOptions } from 'express';

import { AuthenticationService } from './authentication.service';
import { CookiesNames, CookieTokenData } from './types';
import { COOKIE_OPTIONS } from '../config';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CookieService {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  setTokenInCookie(res: Response, name: CookiesNames, tokenData: CookieTokenData, additionalOptions?: CookieOptions) {
    return res.cookie(name, tokenData.token, {
      ...COOKIE_OPTIONS,
      maxAge: tokenData.expiresIn * 1000, // Example: JWT_ACCESS_TOKEN_EXPIRATION_TIME=3600 => Expires in 1 hour (3600 seconds * 1000 milliseconds).
      ...additionalOptions,
    });
  }

  clearCookie(res: Response, name: CookiesNames, additionalOptions?: CookieOptions): void {
    res.clearCookie(name, { ...COOKIE_OPTIONS, ...additionalOptions });
  }

  async setAuthenticationCookies(res: Response, user: User): Promise<void> {
    const { authenticationToken, refreshToken } = this.authenticationService.createAuthenticationsTokens(user.id);

    this.setTokenInCookie(res, CookiesNames.AUTHENTICATION, {
      token: authenticationToken.token,
      expiresIn: authenticationToken.expiresIn,
    });
    this.setTokenInCookie(res, CookiesNames.REFRESH, {
      token: refreshToken.token,
      expiresIn: refreshToken.expiresIn,
    });
    await this.usersService.setCurrentRefreshToken(refreshToken.token, user);
  }
}
