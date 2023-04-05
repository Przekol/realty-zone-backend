import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer, OfferAddress } from '@api/offers/entities';
import { AddressModule } from '@providers/address';
import { DictionariesModule } from '@providers/dictionaries';

import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  imports: [AddressModule, DictionariesModule, TypeOrmModule.forFeature([Offer, OfferAddress])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
