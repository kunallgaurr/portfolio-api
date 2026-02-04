import { Controller, Get, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { type GetWeatherSchemaType } from "./weather.schema";

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    async getWeatherData(@Query() query: GetWeatherSchemaType) {
        return this.weatherService.getWeatherData(query);
    }
}