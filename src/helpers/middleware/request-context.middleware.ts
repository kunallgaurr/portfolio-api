import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import { requestContext } from "src/core";

export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const store = new Map();

        const requestId = crypto.randomUUID();
        const timestamp = Date.now();
        const ip        = req.ip;
        const ua = req.headers['user-agent'];

        const userAgent = new UAParser(ua).getResult();

        store.set('requestId', requestId);
        store.set('timestamp', timestamp);
        store.set('ip', ip);
        store.set('deviceModel', userAgent.device.model);
        store.set('deviceType', userAgent.device.type);
        store.set('deviceVendor', userAgent.device.vendor);

        store.set('browserName', userAgent.browser.name);
        store.set('browserVersion', userAgent.browser.version);
        store.set('osName', userAgent.os.name);
        store.set('osVersion', userAgent.os.version);
        store.set('engineName', userAgent.engine.name);
        store.set('engineVersion', userAgent.engine.version);
        store.set('cpuArchitecture', userAgent.cpu.architecture);


        res.setHeader('X-Request-Id', requestId);

        requestContext.run(store, () => next());
    }
}