import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

import { AddressEntity } from '../types';

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

  @OneToOne(() => User, (user: User) => user.address)
  user?: User;
}
