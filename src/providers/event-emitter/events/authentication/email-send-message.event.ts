import { User } from '@domain/users/entities';

import { MailTemplate } from '@providers/email/types';

export class EmailSendMessageEvent {
  user: User;
  subject: string;
  template: MailTemplate;
}
