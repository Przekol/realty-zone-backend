import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

import { randomBytes } from 'crypto';
import { extname, join } from 'path';

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: join(storageDir()),
    filename: (req, file, cb) => {
      const randomName = randomBytes(16).toString('hex');
      const fileExt = extname(file.originalname);
      cb(null, `${randomName}${fileExt}`);
    },
  }),
};
function storageDir() {
  return join(__dirname, '../../storage');
}
