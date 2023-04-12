import { IsInt, IsNumber } from 'class-validator';

import { FindDictionariesRequest } from '@types';

export class FindDictionariesDto implements FindDictionariesRequest {
  @IsInt()
  @IsNumber()
  market: number;

  @IsInt()
  @IsNumber()
  transaction: number;

  @IsInt()
  @IsNumber()
  ownership: number;

  @IsInt()
  @IsNumber()
  type: number;
}
