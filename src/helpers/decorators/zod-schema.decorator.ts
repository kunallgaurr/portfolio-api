import { SetMetadata } from '@nestjs/common';
import { ZodSchema } from 'zod';

export const ZOD_SCHEMA_KEY = 'zod_schema';

export const UseZodSchema = (schema: ZodSchema) =>
  SetMetadata(ZOD_SCHEMA_KEY, schema);
