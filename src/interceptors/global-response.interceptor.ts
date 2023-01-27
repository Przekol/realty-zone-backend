import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { ClientApiResponse } from '../types';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, ClientApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ClientApiResponse<T>> | Promise<Observable<ClientApiResponse<T>>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(map((data) => ({ ok: true, status, data })));
  }
}
