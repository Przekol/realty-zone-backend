import { User } from '@domain/users/entities';

export class EmailSendConfirmationEvent {
  user: User;
  subject: string;
}
