import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OfferAddress } from '@api/offers/entities';
import { UserAddress } from '@api/users/entities';

import { AddressEntity } from '@types';

@Entity()
export class Address extends BaseEntity implements AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  flatNumber: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => UserAddress, (userAddress) => userAddress.address)
  userAddress: UserAddress;

  @OneToOne(() => OfferAddress, (offerAddress) => offerAddress.address)
  offerAddress: OfferAddress;
}
