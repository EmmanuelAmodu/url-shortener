import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  notFoundResponse(
    message: string,
    error: string,
  ): {
    status: boolean;
    statusCode: HttpStatus;
    message: string;
    error: string;
    data: null;
  } {
    return {
      status: false,
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error,
      data: null,
    };
  }

  badRequestResponse(
    message: string,
    error: any,
  ): {
    status: boolean;
    statusCode: HttpStatus;
    message: string;
    error: string;
    data: null;
  } {
    return {
      status: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      data: null,
      error: error || error.message || error.stack || error.name,
    };
  }

  serverErrorResponse(
    message: string,
    error: any,
  ): { status: boolean; statusCode: HttpStatus; message: string; error: any; data: null; } {
    return {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      data: null,
      error: error || error.message || error.stack || error.name,
    };
  }
}
