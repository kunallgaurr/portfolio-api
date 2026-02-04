// common/interceptors/success-response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpResponseBuilder } from 'src/utils/response-builder';


/**
 * @description Generates a schematic consisitent response 
 * for all endpoints and excludes all the repititive work 
 * for returning a formatted response.
 * 
 * @implements {NestInterceptor}
 */
@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map((data) => HttpResponseBuilder.success(data)),
        );
    }
}
