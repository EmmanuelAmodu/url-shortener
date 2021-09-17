import { Body, Controller, Get, Param, Post, Put, Redirect } from '@nestjs/common';
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

  // Bahaves more like a put then a post
  @Put('api/encode')
  encode(@Body() data: URLDto) {
    const result = this.appService.encode(data.url);
    return result ? 
      this.successResponse.createdResponse(result, 'Url encoded successfully') :
        this.errorResponse.serverErrorResponse('Error occured while encoding url', 'ENCODING_ERROR');
  }

  @Get('api/:code')
  decode(@Param('code') code: string) {
    const result = this.appService.decode(code);
    return result ? 
      this.successResponse.okResponse('Url retrieved successfully', result) :
        this.errorResponse.notFoundResponse('Data not found for this encoding', 'NOT_FOUND');
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
