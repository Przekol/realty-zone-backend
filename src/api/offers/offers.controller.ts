import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';

import { User } from '@api/users/entities';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard } from '@common/guards';

import { OffersResponse } from '@types';

import { CreateOfferDto, OneOfferParamsDto, PaginationOptionsDto } from './dto';
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

  @HttpCode(201)
  @UseGuards(JwtAuthenticationGuard)
  @Post('/')
  createOffer(@Body() createOfferDto: CreateOfferDto, @CurrentUser() user: User): Promise<void> {
    return this.offersService.createOffer(createOfferDto, user);
  }
}
