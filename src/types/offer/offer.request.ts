import { AddressRequest, FindDictionariesRequest } from '@types';

export interface PaginationOptionsRequest {
  page?: number;
  limit?: number;
  sortOrder?: 'ASC' | 'DESC';
}

export interface OfferRequest {
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  constructionYear: number;
  pictures: string[];
  dictionaries: FindDictionariesRequest;
  address: AddressRequest;
}
