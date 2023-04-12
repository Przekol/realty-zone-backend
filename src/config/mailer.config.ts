import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';

const templatePath = join(__dirname, '..', 'providers', 'email', 'templates');

export const getMailerConfig = (configService: ConfigService) => ({
  transport: {
    host: configService.get('EMAIL_HOST'),
    port: configService.get('EMAIL_PORT'),
    auth: {
      user: configService.get('EMAIL_USER'),
      pass: configService.get('EMAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"Realty Zone - Admin" <admin@${configService.get('EMAIL_DOMAIN')}>`,
  },
  template: {
    dir: join(templatePath, 'pages'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  options: {
    partials: {
      dir: join(templatePath, 'partials'),
      options: {
        strict: true,
      },
    },
  },
});
