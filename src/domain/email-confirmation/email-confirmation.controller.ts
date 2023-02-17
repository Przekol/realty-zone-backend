import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { EmailConfirmationService } from './email-confirmation.service';
import { CurrentUser } from '../../common';
import { JwtAuthenticationGuard } from '../authentication/guards';
import { User } from '../users/entities/user.entity';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @HttpCode(200)
  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
    await this.emailConfirmationService.confirmEmail(email);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('resend-confirmation-link')
  async resendConfirmationLink(@CurrentUser() user: User) {
    await this.emailConfirmationService.resendConfirmationLink(user);
  }
}
