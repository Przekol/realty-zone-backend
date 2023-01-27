export enum PostgresErrorCode {
  UniqueViolation = '23505',
  InvalidInput = '22P02',
}

export interface ErrorResponseBadRequestException {
  statusCode: number;
  message: string | string[];
}
