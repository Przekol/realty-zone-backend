import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '@providers/email';
import { ActivationToken, PasswordResetToken, RefreshToken } from '@providers/tokens/entities';

import { TokensService } from './tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivationToken, PasswordResetToken, RefreshToken]),
    EmailModule,
    JwtModule.register({}),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
