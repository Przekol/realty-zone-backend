import { Controller, Get, Query } from '@nestjs/common';

import { OfferResponse } from '@types';

import { PaginationOptionsDto } from './dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Get('/')
  getAllOffers(@Query() paginationOptionsDto: PaginationOptionsDto): Promise<OfferResponse> {
    return this.offersService.getAllOffers(paginationOptionsDto);
  }
}
