import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@domain/users/entities';

import { TokenEntity } from '@providers/tokens/types';

@Entity()
export class PasswordResetToken extends BaseEntity implements TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  hashToken: string;

  @Column({ default: false })
  isUsed: boolean;

  @ManyToOne(() => User, (user) => user.passwordResetTokens)
  user: User;

  @Column({ type: 'bigint', nullable: false })
  expiresIn: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  setExpiresIn() {
    this.expiresIn = Date.now() + 60 * 60 * 1000;
  }
}
