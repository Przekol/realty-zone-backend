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

import { ActivationToken, PasswordResetToken } from '@providers/tokens/entities';
import { RefreshToken } from '@providers/tokens/entities/refresh-token.entity';

import { Role, Status, UserEntity } from '@types';

import { Address } from './address.entity';

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

  @Column({ nullable: true })
  username?: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];

  @Column({ default: null, nullable: true })
  firstName?: string;

  @Column({ default: null, nullable: true })
  lastName?: string;

  @Column({ default: null, nullable: true })
  src?: string;

  @Column({ default: null, nullable: true })
  phone?: string;

  @OneToOne(() => Address, {
    cascade: true,
  })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => ActivationToken, (activationToken) => activationToken.user)
  activationTokens: ActivationToken[];

  @OneToMany(() => PasswordResetToken, (passwordResetToken) => passwordResetToken.user)
  passwordResetTokens: PasswordResetToken[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
