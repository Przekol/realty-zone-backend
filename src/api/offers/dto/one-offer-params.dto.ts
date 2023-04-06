import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OneOfferParamsDto {
  @IsNumber()
  offerNumber: number;

  @IsOptional()
  @IsString()
  offerSlug?: string;
}
