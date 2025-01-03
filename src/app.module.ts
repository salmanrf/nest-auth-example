import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { APP_CONFIG_SCHEMA } from '@/common';
import { formatValidationErrors } from '@/common/utils';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalExceptionsFilter } from './exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: APP_CONFIG_SCHEMA,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        exceptionFactory: formatValidationErrors,
      }),
    },
    { provide: APP_FILTER, useClass: GlobalExceptionsFilter },
  ],
})
export class AppModule {}
