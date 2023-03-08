import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { CookieService } from '@domain/authentication/cookie.service';
import { UsersService } from '@domain/users';
import { User } from '@domain/users/entities';
import { TokensService } from '@providers/tokens';
import { hashData } from '@shared/utils';

import { AuthenticationsTokens, CookiesNames, TokenPayloads } from './types';
import { UserEntity } from '@domain/users/types';
import { TokenPayload } from '@providers/tokens/types';

import { RegisterDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokensService: TokensService,
    @Inject(forwardRef(() => CookieService)) private readonly cookieService: CookieService,
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
      await this.usersService.verifyToken(
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

  getJwtToken(payload: TokenPayloads, secret: string, expiresIn: number): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  createAuthenticationsTokens(id: UserEntity['id']): AuthenticationsTokens {
    const expiresIn: Record<string, number> = {
      authenticationToken: this.configService.get('JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN'),
    };
    return {
      authenticationToken: {
        token: this.getJwtToken(
          { id },
          this.configService.get('JWT_SECRET_AUTHENTICATION_TOKEN'),
          expiresIn.authenticationToken,
        ),
        expiresIn: expiresIn.authenticationToken,
      },
    };
  }

  async generateRefreshTokenAndSetCookie(user: User, res: Response) {
    await this.tokensService.revokeActiveRefreshToken(user.id);
    const { token, expiresIn } = await this.tokensService.createToken(user, { tokenType: 'refresh' });

    await this.cookieService.setTokenInCookie(res, CookiesNames.REFRESH, {
      token,
      expiresIn,
    });
  }
}
