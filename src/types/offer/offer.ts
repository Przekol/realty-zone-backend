import { Market, Ownership, Status, Types, Transaction } from '@providers/dictionaries/entities/dictionary.entity';

import { AddressEntity } from '../address';

export interface OfferEntity {
  id: string;
  offerNumber: number;
  title: string;
  description: string;
  price: number;
  type: Types;
  transaction: Transaction;
  market: Market;
  status: Status;
  ownership: Ownership;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  constructionYear: number;
  pictures: string[];
  offerAddress: OfferAddressEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferAddressEntity {
  id: string;
  offer: OfferEntity;
  address: AddressEntity;
}
