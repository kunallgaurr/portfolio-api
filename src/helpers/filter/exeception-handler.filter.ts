// common/filters/api-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { requestContext } from 'src/core';
import { ApiError } from 'src/utils/api-errors';
import { HttpResponseBuilder } from 'src/utils/response-builder';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ApiExceptionFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const context = requestContext.getStore();

        const dataToLog = {
            path: request.path,
            method: request.method,
            header: request.headers,
            params: request.params,
            query: request.query,
            body: request.body,
            context,
            exception,
        }; 

        // ApiError (expected errors)
        if (exception instanceof ApiError) {
            this.logger.warn('API error occurred', dataToLog);
            return response
                .status(HttpStatus.OK)
                .json(
                    HttpResponseBuilder.error(exception),
                );
        }

        // Unknown / unhandled errors
        this.logger.error('Unexpected error occurred', dataToLog);
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                HttpResponseBuilder.error(
                    new ApiError('Internal server error', 500),
                ),
            );
    }
}
