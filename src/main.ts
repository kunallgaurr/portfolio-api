import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ApiExceptionFilter, SuccessResponseInterceptor } from './helpers';
import { GlobalZodValidationPipe } from './helpers/pipes';
import 'dotenv/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new ApiExceptionFilter());
    app.useGlobalInterceptors(new SuccessResponseInterceptor());

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
