import { BaseEntity, Column, CreateDateColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserProfile } from '@api/users/entities/user-profile.entity';

import { PhotoEntity } from '@types';

export class Photo extends BaseEntity implements PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.avatar)
  profile: UserProfile;
}
