export interface ErrorInfo {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}
export enum ErrorMessage {
  INTERNAL_SERVER_ERROR = 'Something went wrong, try again later.',
  NOT_FOUND = 'Ops! Page not found.',
}

export enum PostgresErrorMessage {
  INVALID_INPUT = 'Invalid input syntax',
  UNIQUE_INPUT = 'Duplicate input syntax',
}

export enum PostgresErrorCode {
  UniqueViolation = '23505',
  InvalidInput = '22P02',
}

export interface ErrorResponseBadRequestException {
  statusCode: number;
  message: string | string[];
}
