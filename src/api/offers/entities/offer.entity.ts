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
  @JoinColumn()
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

  @Column('simple-array')
  pictures: string[];

  @OneToOne(() => OfferAddress, (offerAddress) => offerAddress.offer, {})
  offerAddress: OfferAddress;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
