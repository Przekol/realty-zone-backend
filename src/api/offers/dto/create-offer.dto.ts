import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min, IsArray, ArrayNotEmpty, ValidateNested, IsUUID } from 'class-validator';

import { AddressDto } from '@providers/address/dto';

import { OfferRequest } from '@types';

export class CreateOfferDto implements OfferRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  area: number;

  @IsNumber()
  @Min(0)
  rooms: number;

  @IsNumber()
  @Min(0)
  floor: number;

  @IsNumber()
  @Min(0)
  buildingFloors: number;

  @IsNumber()
  @Min(0)
  constructionYear: number;

  @IsArray()
  @ArrayNotEmpty()
  pictures: string[];

  @IsNumber()
  market: number;

  @IsNumber()
  transaction: number;

  @IsNumber()
  ownership: number;

  @IsNumber()
  status: number;

  @IsNumber()
  type: number;

  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  user: string;
}
