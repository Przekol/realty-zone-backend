import { Role, Status } from '@types';

export const statusMappers = (status: Status) => {
  switch (status) {
    case Status.PENDING_EMAIL_CONFIRMATION:
      return 'Oczekuje na potwierdzenie adresu email';
    case Status.ACTIVE:
      return 'Aktywny';
    case Status.BANNED:
      return 'Zablokowany';
  }
};

export const roleMappers = (roles: string[]) => {
  const role = Number(roles[roles.length - 1]);

  switch (role) {
    case Role.User:
      return 'Użytkownik';
    case Role.Admin:
      return 'Administrator';
  }
};

export const avatarUrlMappers = (url: string) => {
  if (!url) {
    return null;
  }
  return `${process.env.API_URL}/static/avatars/${url}`;
};
