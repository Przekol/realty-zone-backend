import { ServeStaticModuleOptions } from '@nestjs/serve-static';

import { join } from 'path';

export const serveStaticOptions: ServeStaticModuleOptions = {
  rootPath: join(__dirname, '..', '..', 'storage'),
  serveRoot: '/static',
  exclude: ['/api/(.*)'],
};
