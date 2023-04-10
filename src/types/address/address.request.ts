import { AddressEntity } from './address';

export type AddressRequest = Omit<AddressEntity, 'id' | 'createdAt' | 'updatedAt'>;
