import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer, OfferAddress } from '@api/offers/entities';
import { OfferPhotos } from '@api/offers/entities/offer-photos.entity';
import { AddressModule } from '@providers/address';
import { DictionariesModule } from '@providers/dictionaries';
import { PhotosModule } from '@providers/photos';

import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  imports: [
    AddressModule,
    PhotosModule,
    DictionariesModule,
    TypeOrmModule.forFeature([Offer, OfferAddress, OfferPhotos]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
