import { User } from '@domain/users/entities';

import { MailTemplate } from '@providers/email/types';

export class EmailSendLinkAuthenticationEvent {
  user: User;
  subject: string;
  url: string;
  template: MailTemplate;
}
