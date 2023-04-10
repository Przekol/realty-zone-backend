import { diskStorage, StorageEngine } from 'multer';

import * as crypto from 'crypto';
import { extname, join } from 'path';

export enum StorageDestinations {
  AVATARS = 'avatars',
  OFFERS = 'offers',
}
const generateShortHash = () => {
  const buffer = crypto.randomBytes(4);
  return buffer.toString('hex');
};

const generateUniqueFileName = (options: GenerateUniqueFileNameOptions): string => {
  const fileExtension = extname(options.file.originalname);
  let uniqueId = '';
  const hash = generateShortHash();
  const timestamp = Date.now();
  if (options.dest === StorageDestinations.AVATARS) {
    uniqueId = `${options.id}_${timestamp}_${hash}`;
  }
  if (options.dest === StorageDestinations.OFFERS) {
    uniqueId = `${options.id}_${timestamp}_${hash}`;
  }

  return `${uniqueId}${fileExtension}`;
};

export const createMulterOptions = (dest: StorageDestinations): StorageEngine => {
  return diskStorage({
    destination: join(storageDir(), dest),
    filename: (req, file, cb) => {
      const id = req.params.id || req.user.id;
      const uniqueFileName = generateUniqueFileName({ file, id, dest });
      cb(null, uniqueFileName);
    },
  });
};

interface GenerateUniqueFileNameOptions {
  file: Express.Multer.File;
  id?: string;
  dest: StorageDestinations;
}

const storageDir = () => join(__dirname, '..', '..', 'storage');
