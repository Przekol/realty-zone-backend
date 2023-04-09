import { Injectable } from '@nestjs/common';

import { PhotoDto } from '@providers/photos/dto';
import { Photo } from '@providers/photos/entities';

@Injectable()
export class PhotosService {
  async createPhoto(photoDto: PhotoDto) {
    const photo = new Photo();
    photo.url = photoDto.url;
    return photo.save();
  }

  async deletePhoto(avatar: Photo) {
    return avatar.remove();
  }
}
