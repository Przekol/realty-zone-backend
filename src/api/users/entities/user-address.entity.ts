import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@api/users/entities/user.entity';
import { Address } from '@providers/address/entities/address.entity';

import { UserAddressEntity } from '@types';

@Entity()
export class UserAddress extends BaseEntity implements UserAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.userAddress)
  @JoinColumn()
  user: User;

  @OneToOne(() => Address, (address) => address.userAddress)
  @JoinColumn()
  address: Address;
}
