import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { CurrentUser } from '@common/decorators';
import { EmailConfirmationService } from '@domain/email-confirmation';
import { UsersService } from '@domain/users';
import { User } from '@domain/users/entities';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { TokensService } from '@providers/tokens';

import { CookiesNames } from './types';
import { UserEntity } from '@domain/users/types';
import { MailTemplate } from '@providers/email/types';
import { GetOneUserResponse } from '@types';

import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { RegisterDto } from './dto/register.dto';
import { ActiveUserGuard, JwtAuthenticationGuard, JwtRefreshGuard, LocalAuthenticationGuard } from './guards';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly cookiesService: CookieService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly authenticationEmitter: AuthenticationEmitter,
    private readonly tokensService: TokensService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto): Promise<GetOneUserResponse> {
    const user = await this.authenticationService.register(registrationData);

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

    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<GetOneUserResponse> {
    await this.cookiesService.setAuthenticationCookies(res, user);
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    this.cookiesService.clearCookie(res, CookiesNames.AUTHENTICATION);
    await this.usersService.removeHashToken(user, { tokenType: 'refresh' });
  }

  @HttpCode(200)
  @UseGuards(ActiveUserGuard)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getAuthenticatedUser(@CurrentUser() user: UserEntity): Promise<GetOneUserResponse> {
    return user;
  }

  @HttpCode(200)
  @UseGuards(ActiveUserGuard)
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async getNewAuthenticatedTokensByRefreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<GetOneUserResponse> {
    await this.cookiesService.setAuthenticationCookies(res, user);
    return user;
  }
}
