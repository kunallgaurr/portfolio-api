import { Inject, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
import { requestContext } from "src/core/context";
import { RedisService } from "src/core/redis/redis.service";
import { BadRequestError, constants, TooManyRequestsError } from "src/utils";

export class RateLimiterMiddleware implements NestMiddleware {
    constructor(
        @Inject(RedisService) private readonly redisService: RedisService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const path = req.path;
            const deviceId = req.headers['x-device-id'];

            if (!deviceId) {
                throw new BadRequestError('Device Id is required.');
            }

            const key = crypto.createHash('sha256')
                .update(`${path}-${deviceId}`)
                .digest('hex');

            const currentCount = Number(await this.redisService.get(key) ?? 0);

            if (currentCount >= constants.RATE_LIMIT_MAX_REQUESTS) {
                throw new TooManyRequestsError('Too many requests');
            }

            if (currentCount === 0) {
                // First request → set with TTL
                await this.redisService.set(key, 1, constants.RATE_LIMIT_WINDOW);
            } else {
                await this.redisService.increment(key);
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}