import { Expose, Transform } from 'class-transformer';

import { addressOfferMappers, userOfferMappers } from '@api/offers/response.mappers';

import { OneOfferResponse, OneOfferAddressResponse, OneOfferUserResponse } from '@types';

export class OneOfferResponseDto implements OneOfferResponse {
  @Expose()
  offerNumber: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  area: number;

  @Expose()
  rooms: number;

  @Expose()
  floor: number;

  @Expose()
  buildingFloors: number;

  @Expose()
  constructionYear: number;

  @Expose()
  @Transform(({ obj }) => obj.market.name)
  market: string;

  @Expose()
  @Transform(({ obj }) => obj.transaction.name)
  transaction: string;

  @Expose()
  @Transform(({ obj }) => obj.ownership.name)
  ownership: string;

  @Expose()
  @Transform(({ obj }) => obj.type.name)
  type: string;

  @Expose()
  @Transform(({ obj }) => obj.status.name)
  status: string;

  @Expose()
  @Transform(({ obj }) => addressOfferMappers(obj.offerAddress.address))
  address: OneOfferAddressResponse;

  @Expose()
  @Transform(({ obj }) => userOfferMappers(obj.user))
  user: OneOfferUserResponse;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
