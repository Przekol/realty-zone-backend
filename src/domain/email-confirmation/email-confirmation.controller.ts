import { BadRequestException, Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard } from '@domain/authentication/guards';
import { User } from '@domain/users/entities';
import { AuthenticationEmitter } from '@providers/event-emitter/emitters';
import { TokensService } from '@providers/tokens';

import { Status } from '@domain/users/types';
import { MailTemplate } from '@providers/email/types';

import { ConfirmEmailDto } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly authenticationEmitter: AuthenticationEmitter,
    private readonly tokensService: TokensService,
  ) {}

  @HttpCode(200)
  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
    await this.emailConfirmationService.confirmEmail(email);
  }
  // TODO zmiana logiki

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
    const token = await this.tokensService.createToken(user, {
      tokenType: 'activation',
    });

    const activationLink = await this.tokensService.generateTokenLink(token, user.id, {
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
