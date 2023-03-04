import { BadRequestException, Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import { ForgetPasswordDto } from '@domain/reset-password/dto';
import { PasswordResetService } from '@domain/reset-password/password-reset.service';
import { UsersService } from '@domain/users';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';

import { VerifyPasswordResetTokenResponse } from '@types';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordResetService: PasswordResetService,
    private readonly authenticationEmitter: AuthenticationEmitter,
  ) {}

  @HttpCode(200)
  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;

    const user = await this.usersService.getByEmail(email);

    const passwordResetTokenActive = await this.passwordResetService.getResetTokenActiveByUserId(user.id);
    if (passwordResetTokenActive) {
      throw new BadRequestException('Only after one hour you can request for another token');
    }

    const token = await this.passwordResetService.createPasswordResetToken(user);
    const resetTokenLink = await this.passwordResetService.generateResetTokenLink(token, user.id);

    await this.authenticationEmitter.emitPasswordResetEmailSendEvent({
      user,
      subject: 'Resetowanie hasła',
      url: resetTokenLink,
    });
  }

  @HttpCode(200)
  @Get('/verify-password-reset-token')
  async verifyPasswordResetToken(): Promise<VerifyPasswordResetTokenResponse> {
    return { valid: true };
  }
}
