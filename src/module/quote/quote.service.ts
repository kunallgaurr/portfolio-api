import { Injectable } from "@nestjs/common";
import { ZenQuotesAdapter } from "src/adapters/zen-quotes/zen-quoates.adapter";
import { RedisService } from "src/core/redis";
import { constants } from "src/utils";

@Injectable()
export class QuoteService {
    constructor(
        private readonly zenQuoteAdapter: ZenQuotesAdapter,
        private readonly redisService: RedisService
    ) {}

    async getQuoteOfTheDay() {
        try {
            const key = constants.REDIS_KEYS.QUOTES_CACHING.KEY;
            const ttl = constants.REDIS_KEYS.QUOTES_CACHING.TTL;

            const cachedQuotes = await this.redisService.get<unknown[]>(key);
            if (cachedQuotes) return cachedQuotes;

            const response = await this.zenQuoteAdapter.getQuoteOfTheDay();
            await this.redisService.set(key, response, ttl);
            return response;
        } catch (error) {
            throw error;
        }
    }
}