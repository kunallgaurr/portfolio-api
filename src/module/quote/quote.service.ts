import { Injectable } from "@nestjs/common";
import { ZenQuotesAdapter } from "src/adapters/zen-quotes/zen-quoates.adapter";

@Injectable()
export class QuoteService {
    constructor(private readonly zenQuoteAdapter: ZenQuotesAdapter) {}

    async getQuoteOfTheDay() {
        try {
            const response = await this.zenQuoteAdapter.getQuoteOfTheDay();
            return response[0];
        } catch (error) {
            throw error;
        }
    }
}