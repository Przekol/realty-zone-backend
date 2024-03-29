import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Offer } from '@api/offers/entities/offer.entity';
import { Address } from '@providers/address/entities/address.entity';

import { OfferAddressEntity } from '@types';

@Entity({ name: 'offers_addresses' })
export class OfferAddress extends BaseEntity implements OfferAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Offer, (offer: Offer) => offer.offerAddress)
  @JoinColumn()
  offer: Offer;

  @OneToOne(() => Address, (address: Address) => address.offerAddress)
  @JoinColumn()
  address: Address;
}
