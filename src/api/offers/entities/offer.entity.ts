import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OfferPhotos } from '@api/offers/entities/offer-photos.entity';
import { User } from '@api/users/entities';
import { Market, Ownership, Status, Transaction, Types } from '@providers/dictionaries/entities/dictionary.entity';

import { OfferEntity } from '@types';

import { OfferAddress } from './offer-address.entity';

@Entity({ name: 'offers' })
export class Offer extends BaseEntity implements OfferEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  offerNumber: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Market)
  @JoinColumn({ name: 'market' })
  market: Market;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'transaction' })
  transaction: Transaction;

  @ManyToOne(() => Ownership)
  @JoinColumn({ name: 'ownership' })
  ownership: Ownership;

  @ManyToOne(() => Types)
  @JoinColumn({ name: 'type' })
  type: Types;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status' })
  status: Status;

  @Column()
  area: number;

  @Column()
  rooms: number;

  @Column()
  floor: number;

  @Column()
  buildingFloors: number;

  @Column()
  constructionYear: number;

  @OneToOne(() => OfferAddress, (offerAddress) => offerAddress.offer, {})
  offerAddress: OfferAddress;

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => OfferPhotos, (offerPhoto) => offerPhoto.offer)
  offerPhotos: OfferPhotos;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
