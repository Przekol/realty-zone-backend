import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { UnauthorizedAuthenticationTokenException } from '@common/exceptions';
import { ErrorMessage, PostgresErrorMessage } from '@shared/messages';

import { ClientApiResponse } from '@types';

import {
  ErrorResponseBadRequestException,
  ErrorResponseUnauthorizedAuthenticationTokenException,
  PostgresErrorCode,
} from './types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ClientApiResponse<null>>>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string | string[];
    let code: string;

    if (exception instanceof NotFoundException) {
      statusCode = exception.getStatus();
      message = ErrorMessage.NotFound;
    } else if (exception instanceof QueryFailedError) {
      statusCode = 400;
      const code = exception.driverError.code;
      message = this.getPostgresErrorMessage(code);
    } else if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse() as ErrorResponseBadRequestException;
      message = (errorResponse as ErrorResponseBadRequestException).message;
      statusCode = (errorResponse as ErrorResponseBadRequestException).statusCode;
      statusCode = errorResponse.statusCode;
    } else if (exception instanceof UnauthorizedAuthenticationTokenException) {
      statusCode = exception.getStatus();
      const errorResponse = exception.getResponse() as ErrorResponseUnauthorizedAuthenticationTokenException;
      message = (errorResponse as ErrorResponseUnauthorizedAuthenticationTokenException).message;
      code = (errorResponse as ErrorResponseUnauthorizedAuthenticationTokenException).code;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = ErrorMessage.InternalServerError;
    }

    // TODO if (exception instanceof ValidationError) {}

    console.log({
      statusCode,
      error: { message, code },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    response.status(statusCode).json({
      ok: false,
      error: { message, code },
      status: statusCode,
    });
  }

  private getPostgresErrorMessage(code: string): string {
    let message: string;
    switch (code) {
      case PostgresErrorCode.InvalidInput:
        message = PostgresErrorMessage.InvalidInput;
        break;
      case PostgresErrorCode.UniqueViolation:
        message = PostgresErrorMessage.UniqueInput;
        break;
      default:
        message = ErrorMessage.InternalServerError;
        break;
    }
    return message;
  }
}
