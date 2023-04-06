import { diskStorage, StorageEngine } from 'multer';

import { extname, join } from 'path';

export const createMulterOptions = (dest: string): StorageEngine => {
  return diskStorage({
    destination: join(storageDir(), dest),
    filename: (req, file, cb) => {
      const id = req.params.id;
      const uniqueFileName = generateUniqueFileName(file, id);
      cb(null, uniqueFileName);
    },
  });
};

function generateUniqueFileName(file: Express.Multer.File, id?: string): string {
  const fileExtension = extname(file.originalname);
  const uniqueId = `${id ?? Date.now()}-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}-${Math.random().toString(16).slice(2, 7)}`;
  return `${uniqueId}${fileExtension}`;
}

const storageDir = () => join(__dirname, '../../storage');
