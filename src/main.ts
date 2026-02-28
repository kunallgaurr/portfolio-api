import './utils/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ApiExceptionFilter, SuccessResponseInterceptor } from './helpers';
import { config } from './utils/config';
import { GlobalValidationPipe } from './helpers/pipes/validation.pipe';
import helmet from 'helmet';


async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule, {
            abortOnError: true,
            bufferLogs: true,
        });

        app.use(helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
        }));

        app.enableCors({
            origin: '*'
        });

        app.useGlobalPipes(new GlobalValidationPipe());
        app.useGlobalInterceptors(new SuccessResponseInterceptor());
        app.useGlobalFilters(new ApiExceptionFilter());

        process.on('SIGTERM', async () => {
            console.error('SIGTERM received. Shutting down gracefully...');
            await app.close();
            process.exit(0);
        });

        process.on('SIGINT', async () => {
            console.error('SIGINT received. Shutting down gracefully...');
            await app.close();
            process.exit(0);
        });

        await app.listen(config.PORT ?? 3000);
    } catch (error) {
        console.error('Fatal bootstrap error:', error);
        process.exit(1);
    }
}

process.on('unhandledRejection', (reason: any) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

bootstrap();
