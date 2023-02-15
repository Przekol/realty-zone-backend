import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { CookiesNames } from './types';
import { GetOneUserResponse } from '../../@types';
import { CurrentUser } from '../decorators';
import { User } from '../users/entities/user.entity';
import { UserEntity } from '../users/types';
import { UsersService } from '../users/users.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly cookiesService: CookieService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto): Promise<GetOneUserResponse> {
    return await this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<GetOneUserResponse> {
    const { authenticationToken, refreshToken } = this.authenticationService.createAuthenticationsTokens(user.id);

    this.cookiesService.setTokenInCookie(res, CookiesNames.AUTHENTICATION, {
      token: authenticationToken.token,
      expiresIn: authenticationToken.expiresIn,
    });
    this.cookiesService.setTokenInCookie(res, CookiesNames.REFRESH, {
      token: refreshToken.token,
      expiresIn: refreshToken.expiresIn,
    });
    await this.usersService.setCurrentRefreshToken(refreshToken.token, user);
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<null> {
    this.cookiesService.clearCookie(res, CookiesNames.AUTHENTICATION);
    return null;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getAuthenticatedUser(@CurrentUser() user: UserEntity): Promise<GetOneUserResponse> {
    return user;
  }
}
