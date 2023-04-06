import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Offer } from '@api/offers/entities';

import { OffersResponse } from '@types';

import { PaginationOptionsDto } from './dto';
import { mapRawOfferToFormattedOffer } from './response.mappers';

@Injectable()
export class OffersService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllOffers(paginationOptionsDto: PaginationOptionsDto): Promise<OffersResponse> {
    const { page = 1, limit = 10, sortOrder = 'DESC' } = paginationOptionsDto;
    const skip = (page - 1) * limit;

    const [offers, total] = await Offer.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: sortOrder,
      },
    });

    return {
      offers,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    };
  }

  async getOfferByOfferNumber(offerNumber: number) {
    const rawOffer = await this.dataSource
      .createQueryBuilder(Offer, 'offer')
      .leftJoinAndSelect('offer.market', 'market')
      .leftJoinAndSelect('offer.transaction', 'transaction')
      .leftJoinAndSelect('offer.ownership', 'ownership')
      .leftJoinAndSelect('offer.status', 'status')
      .leftJoinAndSelect('offer.type', 'type')
      .leftJoinAndMapOne('offer.offerAddress', 'offers_addresses', 'offerAddress', 'offerAddress.offer = offer.id')
      .leftJoinAndSelect('offerAddress.address', 'address')
      .leftJoinAndSelect('offer.user', 'user')
      .select([
        'offer.id',
        'offer.offerNumber',
        'offer.title',
        'offer.description',
        'offer.price',
        'offer.area',
        'offer.rooms',
        'offer.floor',
        'offer.buildingFloors',
        'offer.constructionYear',
        'offer.pictures',
        'offer.createdAt',
        'offer.updatedAt',
        'market.name',
        'transaction.name',
        'ownership.name',
        'status.name',
        'offerAddress.id',
        'address.street',
        'address.streetNumber',
        'address.city',
        'address.district',
        'user.id',
        'type.name',
      ])
      .where('offer.offerNumber = :offerNumber', { offerNumber })
      .getRawOne();
    return mapRawOfferToFormattedOffer(rawOffer);
  }

  private generateOfferNumber(): number {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    const randomNumber = Math.floor(Math.random() * 100);
    return timestamp * 100 + randomNumber;
  }
}
