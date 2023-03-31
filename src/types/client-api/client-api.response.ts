export type ClientApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
  status: number;
};
