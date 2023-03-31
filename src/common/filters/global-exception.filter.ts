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

import { ErrorMessage, PostgresErrorMessage } from '@shared/messages';

import { ClientApiResponse } from '@types';

import { ErrorResponseBadRequestException, PostgresErrorCode } from './types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ClientApiResponse<null>>>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string;

    if (exception instanceof NotFoundException) {
      statusCode = exception.getStatus();
      message = ErrorMessage.NotFound;
    } else if (exception instanceof QueryFailedError) {
      statusCode = 400;
      const code = exception.driverError.code;
      message = this.getPostgresErrorMessage(code);
    } else if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse() as ErrorResponseBadRequestException;
      if (Array.isArray(errorResponse.message)) {
        message = errorResponse.message.join(' ');
      } else {
        message = errorResponse.message;
      }
      statusCode = errorResponse.statusCode;
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
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    response.status(statusCode).json({
      ok: false,
      error: message,
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
