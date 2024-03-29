import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { User } from '@api/users/entities';
import { CurrentUser } from '@common/decorators';
import { ActiveUserGuard, JwtAuthenticationGuard, JwtRefreshGuard, LocalAuthenticationGuard } from '@common/guards';

import { AuthenticatedStatusResponse } from '@types';

import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto): Promise<void> {
    await this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(ActiveUserGuard)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthenticatedStatusResponse> {
    return this.authenticationService.login(user, res);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthenticatedStatusResponse> {
    return this.authenticationService.logout(user, res);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('/status')
  async getAuthenticatedStatus(@CurrentUser() user: User): Promise<AuthenticatedStatusResponse> {
    return this.authenticationService.getAuthenticatedStatus(user);
  }

  @HttpCode(200)
  @UseGuards(ActiveUserGuard)
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async getNewAuthenticatedTokensByRefreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthenticatedStatusResponse> {
    return this.authenticationService.getNewAuthenticatedTokensByRefreshToken(user, res);
  }
}
