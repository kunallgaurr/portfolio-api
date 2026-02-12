import { Injectable } from "@nestjs/common";
import 'dotenv/config'
import { ZenQuotesMode, ZenQuotesParams } from "./zen-quotes.types";
import { InternalServerError } from "src/utils";
import z, { ZodError, ZodSchema } from "zod";

@Injectable()
export class ZenQuotesAdapter {
    constructor() { }

    private async call<T>(params: ZenQuotesParams, schema: ZodSchema<T>) {
        const endpoint = process.env.ZEN_QUOTES_BASE_URL;

        const url = new URL(endpoint + params.mode);

        let response;
        try {
            /**
             * Fetching the Repsonse from Weather API;
             */
            response = await fetch(url, {
                method: 'GET'
            });

            /**
             * Weather API error codes are always greater than equal to 400;
             */
            if (response.status >= 400) {
                // Fetching the response message from Weather API
                const errorResponse = await response.json();
                throw new InternalServerError('Zen Quotes Adapter: ' + errorResponse.error.message);
            }
        } catch (error) {
            throw new InternalServerError();
        }

        let rawData;
        try {
            rawData = await response.json();
        } catch (error) {
            throw new InternalServerError('Zen Quotes Adapter: Invalid JSON response.');
        }

        try {
            return schema.parse(rawData);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new InternalServerError(
                    'Zen Quotes Adapter: Response schema validation failed',
                );
            }

            throw error;
        }
    }

    async getQuoteOfTheDay() {
        const params: ZenQuotesParams = {
            mode: ZenQuotesMode.RANDOM
        }

        const schema = z.array(
            z.object({
                q: z.string(),
                a: z.string()
            }).transform((data) => ({
                quote: data.q,
                author: data.a
            }))
        );

        try {
            const response = await this.call(params, schema);
            return response;

        } catch (error) {
            throw error;
        }
    }
}