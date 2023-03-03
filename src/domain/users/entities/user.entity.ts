import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PasswordResetToken } from '@domain/reset-password/entities';

import { Address } from './address.entity';

import { Role, Status, UserEntity } from '../types';

@Entity()
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  hashPwd: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING_EMAIL_CONFIRMATION })
  status: Status;

  @Column({ nullable: false })
  username: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];

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

  @Column({ nullable: true })
  currentHashRefreshToken?: string;

  @Column({ nullable: true })
  activationHashToken?: string;

  @OneToMany(() => PasswordResetToken, (passwordResetToken) => passwordResetToken.user)
  passwordResetTokens: PasswordResetToken[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
