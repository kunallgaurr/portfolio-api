import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { requestContext } from "src/core";

export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const store = new Map();

        const requestId = crypto.randomUUID();
        const timestamp = Date.now();
        const ip        = req.ip;

        store.set('requestId', requestId);
        store.set('timestamp', timestamp);
        store.set('ip', ip);

        res.setHeader('X-Request-Id', requestId);

        requestContext.run(store, () => next());
    }
}