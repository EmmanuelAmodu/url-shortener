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
  } {
    return {
      status: false,
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error,
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
  } {
    return {
      status: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error: error || error.message || error.stack || error.name,
    };
  }

  serverErrorResponse(
    message: string,
    error: any,
  ): { status: boolean; statusCode: HttpStatus; message: string; error: any } {
    return {
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error: error || error.message || error.stack || error.name,
    };
  }
}
