import { Inject, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
import { requestContext } from "src/core/context";
import { RedisService } from "src/core/redis/redis.service";
import { BadRequestError, constants, TooManyRequestsError } from "src/utils";

export class RateLimiterMiddleware implements NestMiddleware {
    constructor(
        @Inject(RedisService) private readonly redisService: RedisService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const path = req.path;
            const deviceId= req.headers['x-device-id'];

            if(!deviceId) {
                throw new BadRequestError('Device Id is requried.');
            }

            const key = crypto.hash('sha-256', `${path}-${deviceId}`);

            const count = await this.redisService.get(key);
            if (count && Number(count) > constants.RATE_LIMIT_MAX_REQUESTS) {
                throw new TooManyRequestsError('Too many requests');
            }

            let ttl = constants.RATE_LIMIT_WINDOW;
            if(Number(count) === constants.RATE_LIMIT_MAX_REQUESTS) {
                ttl = await this.redisService.ttl(key);
            }

            const incrementedCount = Number(count) + 1;
            await this.redisService.set(key, incrementedCount, ttl);

            next();
        } catch (error) {
            next(error);
        }
    }
}