import { Controller, Post } from '@nestjs/common';

import { BaseApiResponseDto } from '@/common/dtos';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello() {
    const res = new BaseApiResponseDto({
      data: 'Hello World',
      message: 'Hello retrieved successfully',
    });

    return res;
  }
}
