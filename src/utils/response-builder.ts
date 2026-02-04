import { ApiError, BadRequestError } from "./api-errors";

export class HttpResponseBuilder {
    private static formatResponse<T> (code: Number, message: string, data: T) {
        const response = {
            status: {
                code,
                message,
                timestamp: new Date()
            },
            data
        };

        return response;
    };

    public static success<T>(data: T, message?: string) {
        return this.formatResponse(200, message ?? 'Success', data);
    }

    public static error(error: unknown) {
        if(error instanceof ApiError) {
            return this.formatResponse(
                error.statusCode as number,
                error.message,
                null
            )
        }

        return this.formatResponse(
            500,
            'Internal server error',
            null
        )
    }
}