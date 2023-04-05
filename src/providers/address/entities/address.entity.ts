import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
