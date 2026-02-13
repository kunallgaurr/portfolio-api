import {
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError, HttpResponseBuilder } from 'src/utils';

@Injectable()
export class GlobalValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.shouldValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);

        const errors = await validate(object, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
            throw new BadRequestError('Validation failed');
        }

        return object;
    }

    private shouldValidate(metatype: Function): boolean {
        const primitiveTypes: Function[] = [
            String,
            Boolean,
            Number,
            Array,
            Object,
        ];
        return !primitiveTypes.includes(metatype);
    }
}
