import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';

import { Offer, OfferAddress, OfferPhotos } from '@api/offers/entities';
import { EntityClass } from '@api/offers/types';
import { User } from '@api/users/entities';
import { AddressService } from '@providers/address/address.service';
import { Address } from '@providers/address/entities/address.entity';
import { DictionariesService } from '@providers/dictionaries';
import { Photo } from '@providers/photos/entities';

import { CreateOfferResponse, OffersListResponse, OneOfferResponse } from '@types';

import { PaginationOptionsDto, CreateOfferDto, OneOfferResponseDto } from './dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly addressService: AddressService,
    private readonly dictionariesService: DictionariesService,
  ) {}

  async getAllOffers(paginationOptionsDto: PaginationOptionsDto): Promise<OffersListResponse> {
    const { page = 1, limit = 10, sortOrder = 'DESC' } = paginationOptionsDto;
    const skip = (page - 1) * limit;

    const [offers, total] = await Offer.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: sortOrder,
      },
      relations: [
        'market',
        'transaction',
        'ownership',
        'status',
        'type',
        'offerAddress.address',
        'user.profile',
        'offerPhotos.photos',
      ],
    });
    return {
      offers: offers.map((offer) => this.transformToOneOfferResponse(offer)),
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    };
  }

  async getOfferByOfferNumber(offerNumber: number): Promise<OneOfferResponse> {
    const offer = await Offer.findOneOrFail({
      where: { offerNumber },
      relations: [
        'market',
        'transaction',
        'ownership',
        'status',
        'type',
        'offerAddress.address',
        'user.profile',
        'offerPhotos.photos',
      ],
    });
    return this.transformToOneOfferResponse(offer);
  }

  private generateOfferNumber(): number {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 10000);
    const randomNumber = Math.floor(Math.random() * 100);
    return (timestamp * 100 + randomNumber) % 100000000;
  }

  private async createNewOffer(createOfferDto: CreateOfferDto, user: User, entities: EntityClass[]) {
    const [market, transaction, ownership, status, type] = entities;
    const newOffer = new Offer();
    newOffer.title = createOfferDto.title;
    newOffer.description = createOfferDto.description;
    newOffer.price = createOfferDto.price;
    newOffer.area = createOfferDto.area;
    newOffer.rooms = createOfferDto.rooms;
    newOffer.floor = createOfferDto.floor;
    newOffer.buildingFloors = createOfferDto.buildingFloors;
    newOffer.constructionYear = createOfferDto.constructionYear;
    newOffer.market = market;
    newOffer.transaction = transaction;
    newOffer.ownership = ownership;
    newOffer.status = status;
    newOffer.type = type;
    newOffer.user = user;
    newOffer.offerNumber = this.generateOfferNumber();
    return newOffer.save();
  }

  async createOfferAddress(offer: Offer, address: Address) {
    const newOfferAddress = new OfferAddress();
    newOfferAddress.address = address;
    newOfferAddress.offer = offer;

    return await newOfferAddress.save();
  }

  async createOffer(createOfferDto: CreateOfferDto, user: User): Promise<CreateOfferResponse> {
    const address = await this.addressService.createAddress(createOfferDto.address);
    const entities = await this.dictionariesService.findDictionaries(createOfferDto.dictionaries);
    const offer = await this.createNewOffer(createOfferDto, user, entities);
    await this.createOfferAddress(offer, address);
    return { id: offer.offerNumber };
  }

  async uploadPictures(offerNumber: number, user: User, pictures: Express.Multer.File[]) {
    const offer = await Offer.findOneOrFail({ where: { offerNumber, user: { id: user.id } } });
    const photos = await this.savePictures(pictures);
    await this.saveOfferPhotos(offer, photos);
  }

  private async savePictures(pictures: Express.Multer.File[]): Promise<Photo[]> {
    return await Promise.all(
      pictures.map(async (picture) => {
        const photo = new Photo();
        photo.url = picture.filename;
        await photo.save();
        return photo;
      }),
    );
  }

  private async saveOfferPhotos(offer: Offer, photos: Photo[]): Promise<void> {
    const offerPhotos = new OfferPhotos();
    offerPhotos.offer = offer;
    await offerPhotos.save();

    offerPhotos.photos = photos;
    await offerPhotos.save();
  }

  private transformToOneOfferResponse(offer: Offer): OneOfferResponse {
    return plainToInstance(OneOfferResponseDto, offer, { excludeExtraneousValues: true });
  }
}
