import { OfferEntity, PaginationInfo } from './offer';

export interface OffersResponse {
  offers: OfferEntity[];
  pagination: PaginationInfo;
}

export type OfferResponse = {
  id: string;
  offerNumber: number;
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  constructionYear: number;
  pictures: string[];
  createdAt: string;
  updatedAt: string;
  market: string;
  transaction: string;
  ownership: string;
  status: string;
  type: string;
  address: {
    street: string;
    streetNumber: string;
    city: string;
    district: string;
  };
  user: string;
};

export type CreateOfferResponse = {
  id: number;
};
