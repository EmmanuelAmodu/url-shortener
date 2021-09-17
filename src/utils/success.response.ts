import { HttpStatus } from '@nestjs/common';

export class SuccessResponse {
  createdResponse(
    data: any,
    message: string,
  ): { status: boolean; statusCode: HttpStatus; message: string; data: any } {
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message,
      data,
    };
  }

  okResponse(
    message: string,
    data?: any,
  ): { status: boolean; statusCode: HttpStatus; message: string; data?: any } {
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }
}
