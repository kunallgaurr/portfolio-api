// common/pipes/global-zod-validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodError, type ZodSchema } from 'zod';
import { BadRequestError } from 'src/utils';
import { Reflector } from '@nestjs/core';
import { ZOD_SCHEMA_KEY } from '../decorators/zod-schema.decorator';

@Injectable()
export class GlobalZodValidationPipe implements PipeTransform {
  constructor(private readonly reflector: Reflector) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = this.reflector.get<ZodSchema>(
      ZOD_SCHEMA_KEY,
      metadata.metatype!,
    );

    if (!schema) return value;

    try {
      return schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError('Request validation failed');
      }
      throw error;
    }
  }
}
