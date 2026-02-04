import { Injectable } from "@nestjs/common";
import { BadRequestError, InternalServerError } from "src/utils";
import { WeatherApiErrorResponse, WeatherApiMethods, WeatherParams } from "./weather.types";
import z, { ZodError, ZodSchema } from "zod";
import 'dotenv/config'

@Injectable()
export class WeatherAdapter {
    constructor() { }

    private async call<T>(params: WeatherParams, schema: ZodSchema<T>) {
        // Fetching the base URL and API key from ENV
        const baseUrl = process.env.WEATHER_API_BASE_URL;
        const apiKey = process.env.WEATHER_API_SECRET_KEY;

        // Throwing internal server error is baseURL or apiKey is not found.
        if (!baseUrl || !apiKey) {
            throw new InternalServerError();
        }

        // Validating the query parameteres based or api methods.
        if (params.method === WeatherApiMethods.CURRENT_WEATHER && !params.query.q) {
            throw new BadRequestError(`Weather Adapter: Parameter 'q' not provided.`);
        }

        // creating a new URL instace
        const endpoint = new URL(baseUrl + params.method);

        // Appending the API_KEY at the top
        endpoint.searchParams.append('key', apiKey);
        for (const [key, value] of Object.entries(params.query)) {
            // appending the remainging parameters from the query 
            endpoint.searchParams.append(key, value);
        }

        let response;
        try {
            /**
             * Fetching the Repsonse from Weather API;
             * @see {@link https://www.weatherapi.com/docs/}
             */
            response = await fetch(endpoint, {
                method: 'GET'
            });

            /**
             * Weather API error codes are always greater than equal to 400;
             * @see {@link https://www.weatherapi.com/docs/}
             */
            if (response.status >= 400) {
                // Fetching the response message from Weather API
                const errorResponse: WeatherApiErrorResponse = await response.json();
                throw new InternalServerError('Weather Adapter: ' + errorResponse.error.message);
            }
        } catch (error) {
            throw new InternalServerError();
        }

        let rawData;
        try {
            rawData = await response.json();
        } catch (error) {
            throw new InternalServerError('Weather Adapter: Invalid JSON response.');
        }

        try {
            return schema.parse(rawData);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new InternalServerError(
                    'Weather Adapter: Response schema validation failed',
                );
            }

            throw error;
        }
    }

    async getCurrentWeather(lat: number, long: number) {
        const q = `${lat},${long}`;

        const params: WeatherParams = {
            method: WeatherApiMethods.CURRENT_WEATHER,
            query: { q }
        }

        const schema = z.object({
            location: z.object({
                name: z.string(),
                region: z.string(),
                country: z.string(),
            }),
            current: z.object({
                temp_c: z.number(),
                temp_f: z.number(),
                condition: z.object({
                    text: z.string(),
                })
            })
        });

        try {
            return await this.call(params, schema);
        } catch (error) {
            throw error;
        }
    }
}