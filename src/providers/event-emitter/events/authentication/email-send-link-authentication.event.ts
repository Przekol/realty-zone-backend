import { User } from '@api/users/entities';

import { MailTemplate } from '@types';

export class EmailSendLinkAuthenticationEvent {
  user: User;
  subject: string;
  url: string;
  template: MailTemplate;
}
