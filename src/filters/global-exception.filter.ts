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
import {
  ErrorMessage,
  ErrorResponse,
  ErrorResponseBadRequestException,
  PostgresErrorCode,
  PostgresErrorMessage,
} from '../types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string | string[];

    if (exception instanceof NotFoundException) {
      statusCode = exception.getStatus();
      message = ErrorMessage.NOT_FOUND;
    } else if (exception instanceof QueryFailedError) {
      statusCode = 400;
      const code = exception.driverError.code;
      message = this.getPostgresErrorMessage(code);
    } else if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse();
      message = (errorResponse as ErrorResponseBadRequestException).message;
      statusCode = (errorResponse as ErrorResponseBadRequestException).statusCode;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = ErrorMessage.INTERNAL_SERVER_ERROR;
    }

    // TODO if (exception instanceof ValidationError) {}

    console.log({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    response.status(statusCode).json({
      success: false,
      error: {
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    } as ErrorResponse);
  }

  private getPostgresErrorMessage(code: string): string {
    let message: string;
    switch (code) {
      case PostgresErrorCode.InvalidInput:
        message = PostgresErrorMessage.INVALID_INPUT;
        break;
      case PostgresErrorCode.UniqueViolation:
        message = PostgresErrorMessage.UNIQUE_INPUT;
        break;
      default:
        message = ErrorMessage.INTERNAL_SERVER_ERROR;
        break;
    }
    return message;
  }
}
