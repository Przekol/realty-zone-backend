import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from '@api/users';
import { User } from '@api/users/entities';
import { CookieService } from '@providers/cookie';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { TokensService } from '@providers/tokens';
import { hashData } from '@shared/utils';

import {
  TokenOptions,
  CookiesNames,
  UserEntity,
  TokenPayload,
  MailTemplate,
  AuthenticatedStatusResponse,
} from '@types';

import { RegisterDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly cookieService: CookieService,
    private readonly authenticationEmitter: AuthenticationEmitter,
    private readonly authenticationService: AuthenticationService,
  ) {}
  async signup(registrationData: RegisterDto): Promise<User> {
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

    this.cookieService.setTokenInCookie(res, cookieName, {
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

  async logout(user: User, res: Response): Promise<AuthenticatedStatusResponse> {
    this.cookieService.clearCookie(res, CookiesNames.AUTHENTICATION);
    this.cookieService.clearCookie(res, CookiesNames.REFRESH);

    await this.tokensService.revokeActiveRefreshToken(user.id);
    return this.createAuthenticatedStatusResponse(!user);
  }

  async register(registrationData: RegisterDto) {
    const user = await this.signup(registrationData);

    const { token } = await this.tokensService.createToken(user, {
      tokenType: 'activation',
    });

    const activationLink = await this.tokensService.generateTokenLink(token, {
      tokenType: 'activation',
    });

    await this.authenticationEmitter.emitActivationEmailSendEvent({
      user,
      subject: 'Potwierdzenie rejestracji',
      url: activationLink,
      template: MailTemplate.emailConfirmation,
    });
  }

  async login(user: User, res: Response): Promise<AuthenticatedStatusResponse> {
    await this.authenticationService.renewAuthenticationTokensAndSetCookies(user, res);
    return this.createAuthenticatedStatusResponse(!!user);
  }

  async getNewAuthenticatedTokensByRefreshToken(user: User, res: Response): Promise<AuthenticatedStatusResponse> {
    await this.authenticationService.renewAuthenticationTokensAndSetCookies(user, res);
    return this.getAuthenticatedStatus(user);
  }

  getAuthenticatedStatus(user: User): AuthenticatedStatusResponse {
    return this.createAuthenticatedStatusResponse(!!user);
  }
  private createAuthenticatedStatusResponse(isAuthenticated: boolean): AuthenticatedStatusResponse {
    return { isAuthenticated };
  }
}
