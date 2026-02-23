import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { config, UnauthorizedError } from "src/utils";

export class RequestValidatorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const secretKey = req.headers['x-secret-key'];
        const expectedSecretKey = config.SECURITY_KEY;

        if (secretKey !== expectedSecretKey) {
            throw new UnauthorizedError('Invalid secret key');
        }

        next();
    }
}