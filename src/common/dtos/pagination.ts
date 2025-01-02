import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseDto } from './base-dto';

export class PaginationRequestDto extends BaseDto {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsString()
  sort_by: string = 'created_at';

  @IsIn(['ASC', 'DESC'])
  sort_order: 'DESC';

  getPaginationQueryParams() {
    const offset = (this.page - 1) * this.size;
    const limit = this.size;

    return { limit, offset };
  }
}

export class PaginationResponseDto extends BaseDto {
  @IsNumber()
  total_items: number;

  @IsNumber()
  current_page: number;

  @IsNumber()
  @IsOptional()
  prev_page: number | null;

  @IsNumber()
  @IsOptional()
  next_page: number | null;

  @IsString()
  sort_by: string;

  @IsIn(['ASC', 'DESC'])
  sort_order: string;
}
