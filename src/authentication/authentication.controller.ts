import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CookiesNames, GetOneUserResponse, UserEntity } from '../../@types';
import { CookieService } from './cookie.service';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly cookiesService: CookieService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto): Promise<GetOneUserResponse> {
    return await this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async login(@CurrentUser() user: UserEntity, @Res({ passthrough: true }) res: Response): Promise<GetOneUserResponse> {
    const token = this.authenticationService.getJwtToken(
      { id: user.id },
      this.configService.get('JWT_SECRET_ACCESS'),
      this.configService.get('JWT_EXPIRATION_TIME_ACCESS'),
    );
    this.cookiesService.setTokenInCookie(res, CookiesNames.AUTHENTICATION, {
      token,
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME_ACCESS'),
    });
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<null> {
    this.cookiesService.clearCookie(res, CookiesNames.AUTHENTICATION);
    return null;
  }
}
