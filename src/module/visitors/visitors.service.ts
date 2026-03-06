import { Inject, Injectable } from "@nestjs/common";
import { VisitorsRepository } from "./visitors.repository";
import { requestContext } from "src/core";
import { OnEvent } from "@nestjs/event-emitter";
import { constants } from "src/utils";

@Injectable()
export class VisitorsService {
    constructor(
        private readonly visitorsRepository: VisitorsRepository
    ) {}

    @OnEvent(constants.EVENTS.VISITOR_CREATED)
    async addVisitor() {
        const context         = requestContext.getStore();

        const deviceId        = context?.get('deviceId')        ?? 'Unknown';
        const sessionId       = context?.get('sessionId')       ?? 'Unknown';
        const ipAddress       = context?.get('ip')              ?? 'Unknown';
        const deviceModel     = context?.get('deviceModel')     ?? 'Unknown';
        const deviceType      = context?.get('deviceType')      ?? 'Unknown';
        const deviceVendor    = context?.get('deviceVendor')    ?? 'Unknown';
        const browserName     = context?.get('browserName')     ?? 'Unknown';
        const browserVersion  = context?.get('browserVersion')  ?? 'Unknown';
        const osName          = context?.get('osName')          ?? 'Unknown';
        const osVersion       = context?.get('osVersion')       ?? 'Unknown';
        const engineName      = context?.get('engineName')      ?? 'Unknown';
        const engineVersion   = context?.get('engineVersion')   ?? 'Unknown';
        const cpuArchitecture = context?.get('cpuArchitecture') ?? 'Unknown';

        const visitor = await this.visitorsRepository.findOne({
            where: { deviceId }
        });

        if(visitor && visitor.sessionId === sessionId) {
            visitor.visitCount += 1;
            await this.visitorsRepository.save(visitor);
            return visitor;
        }else {
            const newVisitor = await this.visitorsRepository.save({
                deviceId,
                sessionId,
                ipAddress,
                deviceModel,
                deviceType,
                deviceVendor,
                browserName,
                browserVersion,
                osName,
                osVersion,
                engineName,
                engineVersion,
                cpuArchitecture,
                visitCount: 1
            });

            return newVisitor;
        }
    }

    getVisitors() {}
}