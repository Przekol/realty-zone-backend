import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity, Status } from '../../../@types';
import { Address } from './address.entity';

@Entity()
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  hashPwd: string;

  @Column({ type: 'enum', enum: Status, default: Status.EMAIL_NOT_VERIFIED })
  status: Status;

  @Column({ nullable: false })
  username: string;

  @Column({ default: null, nullable: true })
  firstName?: string;

  @Column({ default: null, nullable: true })
  lastName?: string;

  @Column({ default: null, nullable: true })
  phone?: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  address?: Address;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
