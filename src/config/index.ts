import { cookieOptions } from './cookie.config';
import { envValidationObjectSchema } from './env-validation.config';
import { getMailerConfig } from './mailer.config';
import { createMulterOptions, StorageDestinations } from './multer.config';
import { serveStaticOptions } from './serve-static.config';
import { getTypeOrmConfig } from './typeorm.config';
import { validationPipeOptions } from './validation-pipe.config';

export {
  cookieOptions,
  envValidationObjectSchema,
  getTypeOrmConfig,
  getMailerConfig,
  validationPipeOptions,
  createMulterOptions,
  serveStaticOptions,
  StorageDestinations,
};
