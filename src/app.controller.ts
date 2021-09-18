import { Body, Controller, Get, Param, Put, Redirect, Req } from '@nestjs/common';
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

  @Get('api')
  getAll() {
    return this.appService.urlRepository;
  }

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

  @Get('api/statistic/:code')
  stats(@Param('code') code: string) {
    const result = this.appService.getRequestLogRepository(code);
    return result ? 
      this.successResponse.createdResponse(result, 'Url encoded successfully') :
        this.errorResponse.serverErrorResponse('Error occured while encoding url', 'ENCODING_ERROR');
  }

  @Get('404')
  goToUrlNotFound() {
    return this.errorResponse.notFoundResponse('Data not found for this encoding', 'NOT_FOUND')
  }

  @Get(':code')
  @Redirect('http://localhost:3000/404', 302)
  goToUrl(@Req() req, @Param('code') code: string) {
    const result = this.appService.decode(code);
    if (result) {
      const timeStamp = Date.now();
      const hourStamp = timeStamp - (timeStamp % 3600000);
    
      this.appService.setRequestLogRepository({ 
        code,
        ip: req.ip,
        createdAt: hourStamp
      });
      return result;
    }
  }
}
