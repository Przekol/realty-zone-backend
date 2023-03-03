import { User } from '@domain/users/entities';

export class LinkSendEmailAuthenticationEvent {
  user: User;
  subject: string;
  url: string;
}
