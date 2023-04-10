import { User } from '@api/users/entities';
import { Address } from '@providers/address/entities/address.entity';

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
