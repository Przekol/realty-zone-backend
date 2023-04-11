import { AddressEntity } from '../address';
import { DictionaryEntity } from '../dictionary';
import { PhotoEntity } from '../photo';

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}
export interface OfferPhotosEntity {
  id: string;
  offer: OfferEntity;
  photos: PhotoEntity[];
}
export interface OfferEntity {
  id: string;
  offerNumber: number;
  title: string;
  description: string;
  price: number;
  type: DictionaryEntity;
  transaction: DictionaryEntity;
  market: DictionaryEntity;
  status: DictionaryEntity;
  ownership: DictionaryEntity;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  constructionYear: number;
  offerPhotos: OfferPhotosEntity;
  offerAddress: OfferAddressEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferAddressEntity {
  id: string;
  offer: OfferEntity;
  address: AddressEntity;
}
