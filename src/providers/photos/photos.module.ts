import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Photo } from '@providers/photos/entities';

import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
