import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { User } from '@api/users/entities';
import { CurrentUser } from '@common/decorators';
import { JwtAuthenticationGuard } from '@common/guards';
import { createMulterOptions, StorageDestinations } from '@config';

import { CreateOfferResponse, OffersListResponse, OneOfferResponse } from '@types';

import { CreateOfferDto, OneOfferParamsDto, PaginationOptionsDto } from './dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('/')
  getAllOffers(@Query() paginationOptionsDto: PaginationOptionsDto): Promise<OffersListResponse> {
    return this.offersService.getAllOffers(paginationOptionsDto);
  }

  @Get('/:offerNumber/:offerSlug?')
  getOfferByOfferNumber(@Param() oneOfferParamsDto: OneOfferParamsDto): Promise<OneOfferResponse> {
    return this.offersService.getOfferByOfferNumber(oneOfferParamsDto.offerNumber);
  }

  @HttpCode(201)
  @UseGuards(JwtAuthenticationGuard)
  @Post('/')
  createOffer(@Body() createOfferDto: CreateOfferDto, @CurrentUser() user: User): Promise<CreateOfferResponse> {
    return this.offersService.createOffer(createOfferDto, user);
  }

  @HttpCode(201)
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FilesInterceptor('pictures', 3, { storage: createMulterOptions(StorageDestinations.OFFERS) }))
  @Post('/:id/pictures')
  async uploadPictures(
    @Param('id') offerNumber: number,
    @CurrentUser() user: User,
    @UploadedFiles() pictures: Express.Multer.File[],
  ) {
    await this.offersService.uploadPictures(offerNumber, user, pictures);
  }
}
