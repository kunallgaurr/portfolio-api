// common/interceptors/success-response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { tap } from 'rxjs';
import { constants } from 'src/utils/constants';


/**
 * @description Logs a visitor's information on every request and updates the 
 * visit count.
 * 
 * @implements {NestInterceptor}
 */
@Injectable()
export class VisitorLoggingInterceptor implements NestInterceptor {

    constructor(private readonly eventEmitter: EventEmitter2) { }
    intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            tap(() => {
                this.eventEmitter.emit(constants.EVENTS.VISITOR_CREATED);
            }),
        );
    }
}
