import { BadRequestException, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UsersProfileService, UsersService } from '@api/users';
import { User } from '@api/users/entities';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard } from '@common/guards';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { TokensService } from '@providers/tokens';

import { Status, MailTemplate } from '@types';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly authenticationEmitter: AuthenticationEmitter,
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
    private readonly userProfileService: UsersProfileService,
  ) {}

  @HttpCode(200)
  @Post('confirm')
  async confirm(@Req() req: Request) {
    const { tokenActive } = req;
    const user = await this.usersService.getById(tokenActive.user.id);
    await this.usersService.updateUserStatus(user, Status.ACTIVE);
    await this.tokensService.markTokenAsUsed(tokenActive);
    await this.userProfileService.createProfile(user);

    await this.authenticationEmitter.emitMessageEmailSendEvent({
      user,
      subject: 'Witamy na platformie',
      template: MailTemplate.welcome,
    });
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('resend-confirmation-link')
  async resendConfirmationLink(@CurrentUser() user: User) {
    if (user.status === Status.ACTIVE) {
      throw new BadRequestException('Email already confirmed');
    }

    const activationTokenActive = await this.tokensService.getTokenActiveByUserId(user.id, {
      tokenType: 'activation',
    });
    if (activationTokenActive) {
      throw new BadRequestException('Only after one hour you can request for another token');
    }
    const { token } = await this.tokensService.createToken(user, {
      tokenType: 'activation',
    });

    const activationLink = await this.tokensService.generateTokenLink(token, {
      tokenType: 'activation',
    });

    await this.authenticationEmitter.emitActivationEmailSendEvent({
      user,
      subject: 'Ponowne potwierdzenie rejestracji',
      url: activationLink,
      template: MailTemplate.emailConfirmation,
    });
  }
}
