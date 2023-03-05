import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '@providers/email';
import { ActivationToken, PasswordResetToken } from '@providers/tokens/entities';

import { TokensService } from './tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivationToken, PasswordResetToken]), EmailModule],
  providers: [TokensService],
})
export class TokensModule {}
