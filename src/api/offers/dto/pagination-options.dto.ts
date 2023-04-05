import { IsIn, IsNumber, IsOptional, Min } from 'class-validator';

import { PaginationOptionsRequest } from '@types';

export class PaginationOptionsDto implements PaginationOptionsRequest {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
