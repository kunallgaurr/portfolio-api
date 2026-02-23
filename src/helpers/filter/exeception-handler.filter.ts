// common/filters/api-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { requestContext } from 'src/core';
import { ApiError, BadRequestError, ForbiddenError, NotFoundError, TooManyRequestsError, UnauthorizedError } from 'src/utils/api-errors';
import { HttpResponseBuilder } from 'src/utils/response-builder';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const context = requestContext.getStore();

    // ApiError (expected errors)
    if (exception instanceof ApiError) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseBuilder.error(exception),
        );
    }

    // Unknown / unhandled errors
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        HttpResponseBuilder.error(
          new ApiError('Internal server error', 500),
        ),
      );
  }
}
