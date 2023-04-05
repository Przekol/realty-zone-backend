import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAddress } from '@api/users/entities';
import { User } from '@api/users/entities/user.entity';
import { UsersService } from '@api/users/users.service';
import { AddressModule } from '@providers/address';

import { UsersController } from './users.controller';

@Module({
  imports: [AddressModule, TypeOrmModule.forFeature([User, UserAddress])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
