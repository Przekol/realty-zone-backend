import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { SuccessResponse } from '../types';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<SuccessResponse<T>> | Promise<Observable<SuccessResponse<T>>> {
    return next.handle().pipe(map((data) => ({ success: true, data })));
  }
}
