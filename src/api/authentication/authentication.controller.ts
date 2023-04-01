import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { UserSerializerDto } from '@api/users/dto';
import { User } from '@api/users/entities';
import { CurrentUser } from '@common/decorators';
import { ActiveUserGuard, JwtAuthenticationGuard, JwtRefreshGuard, LocalAuthenticationGuard } from '@common/guards';
import { Serialize } from '@common/interceptors';

import { UserEntity, GetOneUserResponse } from '@types';

import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';

@Controller('authentication')
@Serialize(UserSerializerDto)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto): Promise<GetOneUserResponse> {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<GetOneUserResponse> {
    return this.authenticationService.login(user, res);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authenticationService.logout(user, res);
  }

  @HttpCode(200)
  // @UseGuards(ActiveUserGuard)
  @UseGuards(JwtAuthenticationGuard)
  @Get('/status')
  async getAuthenticatedStatus(@CurrentUser() user: UserEntity): Promise<GetOneUserResponse> {
    // return this.authenticationService.getAuthenticatedStatus(user);
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
    return this.authenticationService.getNewAuthenticatedTokensByRefreshToken(user, res);
  }
}
