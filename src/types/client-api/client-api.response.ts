export type ClientApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: ErrorResponse;
  status: number;
};

interface ErrorResponse {
  message: string | string[];
  code: string;
}
