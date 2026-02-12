import './utils/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ApiExceptionFilter, SuccessResponseInterceptor } from './helpers';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ApiExceptionFilter());
    app.useGlobalInterceptors(new SuccessResponseInterceptor());

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
