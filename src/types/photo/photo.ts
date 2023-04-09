import { UserProfileEntity } from '../user';

export interface PhotoEntity {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  profile: UserProfileEntity;
}
