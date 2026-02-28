import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status';
import { WeatherModule } from './weather';
import { QuoteModule } from './quote/quote.module';
import { PostgresModule } from 'src/core/postgres';
import { DateModule } from './date';
import { EducationModule } from './education';
import { ExperienceModule } from './experience';
import { PhotosModule } from './photos';
import { RateLimiterMiddleware, RequestContextMiddleware } from 'src/helpers';
import { ContactModule } from './contact';
import { RedisModule } from 'src/core';
import { RequestValidatorMiddleware } from 'src/helpers/middleware/request-validator.middleware';
import { ProjectsModule } from './projects';

@Module({
    imports: [
        StatusModule,
        WeatherModule,
        QuoteModule,
        PostgresModule,
        ExperienceModule,
        DateModule,
        EducationModule,
        PhotosModule,
        ContactModule,
        RedisModule,
        ProjectsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestValidatorMiddleware).forRoutes('*')
            .apply(RequestContextMiddleware).forRoutes('*')
            .apply(RateLimiterMiddleware).forRoutes('*');
    }
}
