import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status';
import { WeatherModule } from './weather';
import { QuoteModule } from './quote/quote.module';

@Module({
    imports: [
        StatusModule, 
        WeatherModule, 
        QuoteModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
