import { Injectable } from '@nestjs/common';

import { Offer } from '@api/offers/entities';

import { OfferResponse } from '@types';

import { PaginationOptionsDto } from './dto';

@Injectable()
export class OffersService {
  async getAllOffers(paginationOptionsDto: PaginationOptionsDto): Promise<OfferResponse> {
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
}
