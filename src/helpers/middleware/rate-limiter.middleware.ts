import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
import { requestContext } from "src/core/context";

export class RateLimiterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const ip = req.ip;
            const path = req.path;
            const key = crypto.hash('sha-256', `${path}-${ip}`);
            next();
        } catch (error) {
            next(error);
        }
    }
}