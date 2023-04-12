import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAddress, UserProfile } from '@api/users/entities';
import { User } from '@api/users/entities/user.entity';
import { UsersService } from '@api/users/users.service';
import { AddressModule } from '@providers/address';
import { PhotosModule } from '@providers/photos';

import { UsersProfileService } from './users-profile.service';
import { UsersController } from './users.controller';

@Module({
  imports: [AddressModule, PhotosModule, TypeOrmModule.forFeature([User, UserAddress, UserProfile])],
  controllers: [UsersController],
  providers: [UsersService, UsersProfileService],
  exports: [UsersService, UsersProfileService],
})
export class UsersModule {}
