export class ApiError extends Error{
    statusCode?: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'Bad Request error');
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'You are not authorized.');
        this.statusCode = 401;
    }
}

export class ForbiddenError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'You cannot access this resource.');
        this.statusCode = 403;
    }
}

export class NotFoundError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'Oops! No data found.');
        this.statusCode = 404;
    }
}

export class TooManyRequestsError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'Too many requests.');
        this.statusCode = 429;
    }
}

export class InternalServerError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'An internal server error occured.');
        this.statusCode = 500;
    }
}

export class GatewayTimeoutError extends ApiError {    
    constructor(message?: string) {
        super(message ?? 'Gateway took too long to respond.');
        this.statusCode = 504;
    }
}



