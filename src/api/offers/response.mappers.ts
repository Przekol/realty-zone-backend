import { User } from '@api/users/entities';
import { Address } from '@providers/address/entities/address.entity';
import { Photo } from '@providers/photos/entities';

import { OneOfferAddressResponse, OneOfferUserResponse } from '@types';

export const addressOfferMappers = (address: Address): OneOfferAddressResponse => {
  return {
    street: address.street,
    city: address.city,
    country: address.country,
    district: address.district,
  };
};

export const userOfferMappers = (user: User): OneOfferUserResponse => {
  return {
    email: user.email,
    phone: user.profile.phoneNumber || null,
  };
};

const photoUrlMappers = (photoUrl: string): string => {
  if (!photoUrl) {
    return null;
  }
  return `${process.env.API_URL}/static/offers/${photoUrl}`;
};

export const offerPhotosMappers = (photos: Photo[]): string[] => {
  return photos.map((photo) => photoUrlMappers(photo.url));
};
