import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Offer, OfferAddress, OfferPhotos } from '@api/offers/entities';
import { User } from '@api/users/entities';
import { AddressService } from '@providers/address/address.service';
import { Address } from '@providers/address/entities/address.entity';
import { DictionariesService } from '@providers/dictionaries';
import { Photo } from '@providers/photos/entities';

import { CreateOfferResponse, EntityClass, OffersResponse } from '@types';

import { PaginationOptionsDto, CreateOfferDto } from './dto';
import { mapRawOfferToFormattedOffer } from './response.mappers';

@Injectable()
export class OffersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly addressService: AddressService,
    private readonly dictionariesService: DictionariesService,
  ) {}

  async getAllOffers(paginationOptionsDto: PaginationOptionsDto): Promise<OffersResponse> {
    const { page = 1, limit = 10, sortOrder = 'DESC' } = paginationOptionsDto;
    const skip = (page - 1) * limit;

    const [offers, total] = await Offer.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: sortOrder,
      },
    });

    return {
      offers,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    };
  }

  async getOfferByOfferNumber(offerNumber: number) {
    const rawOffer = await this.dataSource
      .createQueryBuilder(Offer, 'offer')
      .leftJoinAndSelect('offer.market', 'market')
      .leftJoinAndSelect('offer.transaction', 'transaction')
      .leftJoinAndSelect('offer.ownership', 'ownership')
      .leftJoinAndSelect('offer.status', 'status')
      .leftJoinAndSelect('offer.type', 'type')
      .leftJoinAndMapOne('offer.offerAddress', 'offers_addresses', 'offerAddress', 'offerAddress.offer = offer.id')
      .leftJoinAndSelect('offerAddress.address', 'address')
      .leftJoinAndSelect('offer.user', 'user')
      .select([
        'offer.id',
        'offer.offerNumber',
        'offer.title',
        'offer.description',
        'offer.price',
        'offer.area',
        'offer.rooms',
        'offer.floor',
        'offer.buildingFloors',
        'offer.constructionYear',
        'offer.pictures',
        'offer.createdAt',
        'offer.updatedAt',
        'market.name',
        'transaction.name',
        'ownership.name',
        'status.name',
        'offerAddress.id',
        'address.street',
        'address.streetNumber',
        'address.city',
        'address.district',
        'user.id',
        'type.name',
      ])
      .where('offer.offerNumber = :offerNumber', { offerNumber })
      .getRawOne();
    return mapRawOfferToFormattedOffer(rawOffer);
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

    const photos = await Promise.all(
      pictures.map(async (picture) => {
        const photo = new Photo();
        photo.url = picture.filename;

        await photo.save();

        return photo;
      }),
    );

    const offerPhotos = new OfferPhotos();
    offerPhotos.offer = offer;
    await offerPhotos.save();

    offerPhotos.photos = photos;
    await offerPhotos.save();
  }
}
