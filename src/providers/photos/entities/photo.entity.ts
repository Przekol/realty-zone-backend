import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OfferPhotos } from '@api/offers/entities/offer-photos.entity';
import { UserProfile } from '@api/users/entities/user-profile.entity';

import { PhotoEntity } from '@types';

@Entity({ name: 'photos' })
export class Photo extends BaseEntity implements PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ length: 255 })
  @Expose()
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.avatar)
  profile: UserProfile;

  @OneToMany(() => OfferPhotos, (offerPhoto) => offerPhoto.photos)
  offerPhotos: OfferPhotos;
}
