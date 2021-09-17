import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { URLDto } from './app.dto';
import { AppService } from './app.service';
import { ErrorResponse } from './utils/error.response';
import { SuccessResponse } from './utils/success.response';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly successResponse: SuccessResponse,
    private readonly errorResponse: ErrorResponse,
  ) {}

  @Post('api/encode')
  async encode(@Body() data: URLDto) {
    return this.appService.encode(data.url);
  }

  @Get('api/:code')
  async decode(@Param('code') code: string) {
    return this.appService.decode(code);
  }

  @Get('404')
  goToUrlNotFound(@Param('code') code: string) {
    return this.errorResponse.notFoundResponse('Data not found for this encoding', 'NOT_FOUND')
  }

  @Get(':code')
  @Redirect('http://localhost:3000/404', 302)
  goToUrl(@Param('code') code: string) {
    return this.appService.decode(code);
  }

}
