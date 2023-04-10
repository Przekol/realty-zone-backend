import { Injectable } from '@nestjs/common';

import { unlink } from 'node:fs/promises';
import { join } from 'path';

import { PhotoDto } from '@providers/photos/dto';
import { Photo } from '@providers/photos/entities';

@Injectable()
export class PhotosService {
  async createPhoto(photoDto: PhotoDto) {
    const photo = new Photo();
    photo.url = photoDto.url;
    return photo.save();
  }

  async deletePhoto(photo: Photo) {
    const dir = photo.profile ? 'avatars' : 'offers';
    const filePath = join(__dirname, '..', '..', '..', 'storage', dir, photo.url);
    await unlink(filePath);
    return photo.remove();
  }
}
