import { HttpStatus } from '@nestjs/common';

export type SuccessAPIRes = {
  status: boolean;
  statusCode: HttpStatus;
  message: string;
  data: any;
}

export class SuccessResponse {
  createdResponse(
    data: any,
    message: string,
  ): SuccessAPIRes {
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message,
      data: data || null,
    };
  }

  okResponse(
    message: string,
    data?: any,
  ): SuccessAPIRes {
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message,
      data: data || null,
    };
  }
}
