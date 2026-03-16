import 'dotenv/config';
import { z } from 'zod';

const environmentVariablesSchema = z.object({
    PORT: z.coerce.number().int().positive(),

    NODE_ENV: z
        .enum(['development', 'testing', 'production'])
        .default('development'),
    ALLOWED_ORIGINS: z.string().min(1).transform((str) => str.split(',').map((origin) => origin.trim())),
    SECURITY_KEY: z.string().min(1),

    WEATHER_API_SECRET_KEY: z.string().min(1),
    WEATHER_API_BASE_URL: z.url(),
    ZEN_QUOTES_BASE_URL: z.url(),

    POSTGRES_DB_HOST: z.string().min(1),
    POSTGRES_DB_PORT: z.coerce.number().int().positive(),
    POSTGRES_DB_NAME: z.string().min(1),
    POSTGRES_DB_USERNAME: z.string().min(1),
    POSTGRES_DB_PASSWORD: z.string().min(1),

    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_SECRET_KEY: z.string().min(1),
    CLOUDINARY_ENVIRONMENT_NAME: z.string().min(1),

    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.coerce.number().int().positive(),
    REDIS_USERNAME: z.string().min(1),
    REDIS_PASSWORD: z.string().min(1),

    HASHNODE_BASE_URL: z.url(),
    HASHNODE_ACCESS_TOKEN: z.string().min(1),
});

export const config = environmentVariablesSchema.parse(process.env);

console.log('Successfully loaded env variables.')