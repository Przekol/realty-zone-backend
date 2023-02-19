import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';

export const mailerConfig = (configService: ConfigService) => ({
  transport: {
    host: configService.get('EMAIL_HOST'),
    port: configService.get('EMAIL_PORT'),
    auth: {
      user: configService.get('EMAIL_USER'),
      pass: configService.get('EMAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"Realty Zone - Admin" <admin@${configService.get('FRONTEND_DOMAIN')}>`,
  },
  template: {
    dir: join(__dirname + '/..' + '/providers/email/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
