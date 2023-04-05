import { OfferEntity, PaginationInfo } from './offer';

export interface OfferResponse {
  offers: OfferEntity[];
  pagination: PaginationInfo;
}
