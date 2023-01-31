import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CookiesNames, UserEntity } from '../types';
import { CookieService } from './cookie.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly cookiesService: CookieService,
  ) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto) {
    return await this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  async login(@CurrentUser() user: UserEntity, @Res({ passthrough: true }) res: Response) {
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
}
