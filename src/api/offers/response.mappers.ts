import { OfferResponse } from '@types';

export const mapRawOfferToFormattedOffer = (rawOffer): OfferResponse => {
  return {
    id: rawOffer.offer_id,
    offerNumber: rawOffer.offer_offer_number,
    title: rawOffer.offer_title,
    description: rawOffer.offer_description,
    price: rawOffer.offer_price,
    area: rawOffer.offer_area,
    rooms: rawOffer.offer_rooms,
    floor: rawOffer.offer_floor,
    buildingFloors: rawOffer.offer_building_floors,
    constructionYear: rawOffer.offer_construction_year,
    pictures: rawOffer.offer_pictures,
    createdAt: rawOffer.offer_created_at,
    updatedAt: rawOffer.offer_updated_at,
    market: rawOffer.market_name,
    transaction: rawOffer.transaction_name,
    ownership: rawOffer.ownership_name,
    status: rawOffer.status_name,
    type: rawOffer.type_name,
    address: {
      street: rawOffer.address_street,
      streetNumber: rawOffer.address_street_number,
      city: rawOffer.address_city,
      district: rawOffer.address_district,
    },
    user: rawOffer.user_id,
  };
};
