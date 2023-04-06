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
import { multerOptions } from '@config';

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
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FilesInterceptor('pictures', 12, multerOptions))
  @Post('/')
  createOffer(
    // @Body() createOfferDto: CreateOfferDto,
    @CurrentUser() user: User,
    @UploadedFiles() pictures: Express.Multer.File[],
  ): Promise<void> {
    console.log({ pictures });
    return null;
    // return this.offersService.createOffer(createOfferDto, user);
  }
}
