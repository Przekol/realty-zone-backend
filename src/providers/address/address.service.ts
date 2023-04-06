import { Injectable } from '@nestjs/common';

import { AddressDto } from '@providers/address/dto';
import { Address } from '@providers/address/entities/address.entity';

@Injectable()
export class AddressService {
  async createAddress(addressDto: AddressDto) {
    const newAddress = new Address();
    newAddress.street = addressDto.street;
    newAddress.streetNumber = addressDto.streetNumber;
    newAddress.flatNumber = addressDto.flatNumber;
    newAddress.city = addressDto.city;
    newAddress.district = addressDto.district;
    newAddress.zipCode = addressDto.zipCode;
    newAddress.country = addressDto.country;

    return await newAddress.save();
  }
}
