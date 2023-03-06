import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { ForgetPasswordDto, PasswordResetDto } from '@domain/password-reset/dto';
import { UsersService } from '@domain/users';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { TokensService } from '@providers/tokens';

import { MailTemplate } from '@providers/email/types';
import { VerifyPasswordResetTokenResponse } from '@types';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationEmitter: AuthenticationEmitter,
    private readonly tokensService: TokensService,
  ) {}

  @HttpCode(200)
  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;

    const user = await this.usersService.getByEmail(email);

    const passwordResetTokenActive = await this.tokensService.getTokenActiveByUserId(user.id, {
      tokenType: 'password-reset',
    });
    if (passwordResetTokenActive) {
      throw new BadRequestException('Only after one hour you can request for another token');
    }

    const token = await this.tokensService.createToken(user, {
      tokenType: 'password-reset',
    });
    const resetTokenLink = await this.tokensService.generateTokenLink(token, {
      tokenType: 'password-reset',
    });

    await this.authenticationEmitter.emitPasswordResetEmailSendEvent({
      user,
      subject: 'Resetowanie hasła',
      url: resetTokenLink,
      template: MailTemplate.passwordReset,
    });
  }

  @HttpCode(200)
  @Get('/verify-password-reset-token')
  async verifyPasswordResetToken(): Promise<VerifyPasswordResetTokenResponse> {
    return { valid: true };
  }

  @HttpCode(200)
  @Post()
  async passwordReset(@Req() req: Request, @Body() passwordResetDto: PasswordResetDto) {
    const { newPassword } = passwordResetDto;
    const { tokenActive } = req;

    const user = await this.usersService.getById(tokenActive.user.id);
    await this.usersService.changePassword(user, newPassword);

    await this.tokensService.markTokenAsUsed(tokenActive);

    await this.authenticationEmitter.emitConfirmationEmailSendEvent({
      user,
      subject: 'Potwierdzenie zmiany hasła',
      template: MailTemplate.passwordResetSuccess,
    });
  }
}
