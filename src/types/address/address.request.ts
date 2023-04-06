import { AddressEntity } from '@types';

export type AddressRequest = Omit<AddressEntity, 'id' | 'createdAt' | 'updatedAt'>;
