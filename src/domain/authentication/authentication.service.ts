import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import { CookieService } from '@domain/authentication/cookie.service';
import { UsersService } from '@domain/users';
import { User } from '@domain/users/entities';
import { TokensService } from '@providers/tokens';
import { hashData } from '@shared/utils';

import { CookiesNames } from './types';
import { UserEntity } from '@domain/users/types';
import { TokenOptions, TokenPayload } from '@providers/tokens/types';

import { RegisterDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly cookieService: CookieService,
  ) {}
  async register(registrationData: RegisterDto): Promise<User> {
    const hashPwd = await hashData(registrationData.password);

    return await this.usersService.create({
      ...registrationData,
      hashPwd,
    });
  }
  async getAuthenticatedUser(email: string, password: string): Promise<UserEntity> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.usersService.verifyPassword(
        password,
        user.hashPwd,
        new UnauthorizedException('Wrong credentials provided'),
      );

      return user;
    } catch (error) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
  }

  async getAuthenticatedUserByAuthenticationToken(id: string): Promise<UserEntity> {
    return await this.usersService.getById(id);
  }

  async getAuthenticatedUserByRefreshToken(refreshToken: string, payload: TokenPayload): Promise<UserEntity> {
    const { userId, tokenType } = payload;
    const user = await this.usersService.getById(userId);
    const tokenActive = await this.tokensService.getTokenActiveByUserId(userId, { tokenType });
    if (!tokenActive) {
      throw new UnauthorizedException('Wrong credentials provided');
    }
    await this.tokensService.verifyToken(refreshToken, tokenActive.hashToken);
    await this.tokensService.markTokenAsUsed(tokenActive);
    return user;
  }

  async generateAuthenticationTokenAndSetCookie(user: User, res: Response, options: TokenOptions) {
    let cookieName: CookiesNames;
    const { tokenType } = options;

    const { token, expiresIn } = await this.tokensService.createToken(user, { tokenType });

    switch (tokenType) {
      case 'refresh':
        cookieName = CookiesNames.REFRESH;
        break;
      case 'authentication':
        cookieName = CookiesNames.AUTHENTICATION;
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }

    await this.cookieService.setTokenInCookie(res, cookieName, {
      token,
      expiresIn,
    });
  }

  async renewAuthenticationTokensAndSetCookies(user: User, res: Response) {
    await this.tokensService.revokeActiveRefreshToken(user.id);
    await this.generateAuthenticationTokenAndSetCookie(user, res, { tokenType: 'refresh' });
    await this.generateAuthenticationTokenAndSetCookie(user, res, {
      tokenType: 'authentication',
    });
  }

  async logout(user: User, res: Response) {
    this.cookieService.clearCookie(res, CookiesNames.AUTHENTICATION);
    this.cookieService.clearCookie(res, CookiesNames.REFRESH);

    await this.tokensService.revokeActiveRefreshToken(user.id);
  }
}
