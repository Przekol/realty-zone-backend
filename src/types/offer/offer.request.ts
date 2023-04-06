import { AddressRequest } from '@types';

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
  market: number;
  transaction: number;
  ownership: number;
  status: number;
  type: number;
  address: AddressRequest;
}
