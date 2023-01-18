import { ErrorInfo } from './error';

export interface ErrorResponse {
  success: false;
  error: ErrorInfo;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;