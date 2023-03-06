import { User } from '@domain/users/entities';

import { MailTemplate } from '@providers/email/types';

export class EmailSendConfirmationEvent {
  user: User;
  subject: string;
  template: MailTemplate;
}
