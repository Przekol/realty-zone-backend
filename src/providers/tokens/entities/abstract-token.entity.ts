import { BaseEntity, BeforeInsert, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AbstractTokenEntity } from '@providers/tokens/types';

export abstract class AbstractToken extends BaseEntity implements AbstractTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  hashToken: string;

  @Column({ default: false })
  isUsed: boolean;

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
