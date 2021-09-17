import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorResponse } from './utils/error.response';
import { SuccessResponse } from './utils/success.response';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    SuccessResponse,
    ErrorResponse
  ]
})
export class AppModule {}
