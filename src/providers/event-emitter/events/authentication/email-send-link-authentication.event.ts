import { User } from '@domain/users/entities';

export class EmailSendLinkAuthenticationEvent {
  user: User;
  subject: string;
  url: string;
}
