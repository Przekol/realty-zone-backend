import { User } from '@domain/users/entities';

export class VerificationLinkSendEvent {
  user: User;
  subject: string;
}
