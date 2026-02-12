import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestError } from 'src/utils';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor() { }
    
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.shouldValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);

        const errors = await validate(object);

        console.log(errors);

        if (errors.length > 0) {
            throw new BadRequestError('Validation failed: ' + errors[0].property);
        }

        return object; // IMPORTANT: return transformed object
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
