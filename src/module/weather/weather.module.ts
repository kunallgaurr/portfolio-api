import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherAdapter } from 'src/adapters';

@Module({
    imports: [],
    controllers: [WeatherController],
    providers: [WeatherService, WeatherAdapter],
})
export class WeatherModule { }
