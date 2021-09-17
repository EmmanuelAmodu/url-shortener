import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { URLDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('encode')
  async encode(@Body() data: URLDto) {
    return this.appService.encode(data.url);
  }
}
