import { BaseEntity, Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Photo } from '@providers/photos/entities';

import { UserProfileEntity } from '@types';

import { User } from './user.entity';

export class UserProfile extends BaseEntity implements UserProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, default: null, nullable: true })
  username?: string;

  @Column({ length: 50, default: null, nullable: true })
  firstName?: string;

  @Column({ length: 50, default: null, nullable: true })
  lastName?: string;

  @Column({ length: 15, default: null, nullable: true })
  phoneNumber?: string;

  @OneToOne(() => Photo, (photo) => photo.profile)
  @JoinColumn()
  avatar: Photo;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
