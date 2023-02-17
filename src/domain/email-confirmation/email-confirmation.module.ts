import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailModule } from '../../providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [EmailModule, JwtModule.register({}), UsersModule],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
