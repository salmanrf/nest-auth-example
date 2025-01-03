import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { BaseApiResponseDto } from '@/common/dtos';

@Catch(HttpException)
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const errorResponse = exception.getResponse();
    const statusCode = exception.getStatus();

    let errorCode = '';
    let errorMessage = '';
    let errorDetails = null;

    if (typeof errorResponse === 'string') {
      errorMessage = errorResponse;
      errorDetails = [];
    }

    if (typeof errorResponse === 'object') {
      errorCode = errorResponse['error'];
      errorMessage = errorResponse['message'];

      if (typeof errorResponse['message'] === 'object') {
        errorDetails = errorResponse['message'];
      }
    }

    const apiResponse = new BaseApiResponseDto({
      status: 'error',
      status_code: statusCode,
      data: null,
      error: {
        code: errorCode,
        details: errorDetails,
        message: errorMessage,
        path: request.url,
      },
      message: '',
      pagination: null,
    });

    return response.status(statusCode).json(apiResponse);
  }
}
