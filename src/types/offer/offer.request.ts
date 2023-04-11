import { AddressRequest } from '../address/address.request';
import { FindDictionariesRequest } from '../dictionary/dictionary.request';

export type PaginationOptionsRequest = {
  page?: number;
  limit?: number;
  sortOrder?: 'ASC' | 'DESC';
};

export type OfferRequest = {
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  constructionYear: number;
  dictionaries: FindDictionariesRequest;
  address: AddressRequest;
};
