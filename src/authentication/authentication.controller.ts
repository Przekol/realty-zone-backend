import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { RegisterDto } from './dto/register.dto';
import { ActiveUserGuard } from './guards/active-user.guard';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { CookiesNames } from './types';
import { GetOneUserResponse } from '../../@types';
import { CurrentUser } from '../decorators';
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service';
import { User } from '../users/entities/user.entity';
import { UserEntity } from '../users/types';
import { UsersService } from '../users/users.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly cookiesService: CookieService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto): Promise<GetOneUserResponse> {
    const user = await this.authenticationService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(user);
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
