import { User } from '@api/users/entities';

import { MailTemplate } from '@types';

export class EmailSendMessageEvent {
  user: User;
  subject: string;
  template: MailTemplate;
}
