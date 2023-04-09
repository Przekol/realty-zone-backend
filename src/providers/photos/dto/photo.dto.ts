import { IsOptional, IsString, MaxLength } from 'class-validator';

export class PhotoDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  url?: string;
}
