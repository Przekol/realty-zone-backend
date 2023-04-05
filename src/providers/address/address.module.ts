import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '@providers/address/entities/address.entity';

import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService],
})
export class AddressModule {}
