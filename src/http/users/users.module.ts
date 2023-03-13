import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '@http/users/entities/address.entity';
import { User } from '@http/users/entities/user.entity';
import { UsersService } from '@http/users/users.service';

import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
