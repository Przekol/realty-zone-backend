import { PaginationInfo } from './offer';

export type OffersResponse = {
  offers: OneOfferResponse[];
  pagination: PaginationInfo;
};

export type OneOfferResponse = {
  offerNumber: number;
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  constructionYear: number;
  market: string;
  transaction: string;
  ownership: string;
  type: string;
  status: string;
  address: OneOfferAddressResponse;
  user: OneOfferUserResponse;
};

export type OneOfferAddressResponse = {
  street: string;
  city: string;
  district: string;
  country: string;
};

export type OneOfferUserResponse = {
  email: string;
  phone: string | null;
};

export type CreateOfferResponse = {
  id: number;
};
