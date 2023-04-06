import { Controller, Get, Param, Query } from '@nestjs/common';

import { OffersResponse } from '@types';

import { OneOfferParamsDto, PaginationOptionsDto } from './dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Get('/')
  getAllOffers(@Query() paginationOptionsDto: PaginationOptionsDto): Promise<OffersResponse> {
    return this.offersService.getAllOffers(paginationOptionsDto);
  }

  // @Get('/basic')
  // getBasicOffers() {
  //   return this.offersService.getBasicOffers();
  // }

  @Get('/:offerNumber/:offerSlug?')
  getOfferByOfferNumber(@Param() oneOfferParamsDto: OneOfferParamsDto) {
    return this.offersService.getOfferByOfferNumber(oneOfferParamsDto.offerNumber);
  }
}
