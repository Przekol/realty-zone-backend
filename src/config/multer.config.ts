import { diskStorage, StorageEngine } from 'multer';

import { extname, join } from 'path';

export enum StorageDestinations {
  AVATARS = 'avatars',
  OFFERS = 'offers',
}

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
function generateUniqueFileName(options: GenerateUniqueFileNameOptions): string {
  const fileExtension = extname(options.file.originalname);
  let uniqueId = '';
  const timestamp = Date.now();
  if (options.dest === StorageDestinations.AVATARS) {
    uniqueId = `${options.id}_${timestamp}`;
  }
  if (options.dest === StorageDestinations.OFFERS) {
    uniqueId = `${options.id}_${timestamp.toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  }

  return `${uniqueId}${fileExtension}`;
}

const storageDir = () => join(__dirname, '..', '..', 'storage');
