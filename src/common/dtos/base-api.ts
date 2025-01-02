import { HttpStatus } from '@nestjs/common';

import { ErrorDetailsDto } from './errors';
import { PaginationResponseDto } from './pagination';

export class BaseApiErrorResponseDto {
  code: string;

  message: string = '';

  path: string;

  details: ErrorDetailsDto[];

  constructor(values: Partial<BaseApiErrorResponseDto>) {
    Object.assign(this, values);
  }
}

export class BaseApiResponseDto<T> {
  status: string = 'success';

  status_code: number = HttpStatus.OK;

  message: string = '';

  data?: T = null;

  pagination?: PaginationResponseDto = null;

  error?: BaseApiErrorResponseDto = null;

  constructor(values: Partial<BaseApiResponseDto<T>>) {
    Object.assign(this, values);
  }
}
