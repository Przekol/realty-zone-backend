import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Offer } from '@api/offers/entities/offer.entity';
import { Photo } from '@providers/photos/entities';

import { OfferPhotosEntity } from '@types';

@Entity({ name: 'offers_photos' })
export class OfferPhotos extends BaseEntity implements OfferPhotosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Offer, (offer) => offer.offerPhotos)
  @JoinColumn()
  offer: Offer;

  @ManyToOne(() => Photo, (photo) => photo.offerPhotos)
  @JoinColumn()
  photos: Photo[];
}
