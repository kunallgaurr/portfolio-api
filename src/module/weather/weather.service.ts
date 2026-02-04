import { Injectable } from "@nestjs/common";
import { WeatherAdapter } from "src/adapters";
import { GetWeatherSchemaType } from "./weather.schema";

@Injectable()
export class WeatherService {
    constructor(private readonly weatherAdapter: WeatherAdapter) {}

    async getWeatherData(payload: GetWeatherSchemaType) {
        const { latitude, longitude } = payload;

        try {
            return await this.weatherAdapter.getCurrentWeather(
                Number(latitude), 
                Number(longitude)
            );
        } catch (error) {
            throw error;
        }
    }
}