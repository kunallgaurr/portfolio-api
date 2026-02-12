import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status';
import { WeatherModule } from './weather';
import { QuoteModule } from './quote/quote.module';
import { PostgresModule } from 'src/core/postgres';
import { ExperienceModule } from './experience/experience.module';

@Module({
    imports: [
        StatusModule, 
        WeatherModule, 
        QuoteModule,
        PostgresModule,
        ExperienceModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
