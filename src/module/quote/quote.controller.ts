import { Controller, Get } from "@nestjs/common";
import { QuoteService } from "./quote.service";

@Controller('quote')
export class QuoteController {
    constructor(private readonly quoteService: QuoteService) {};

    @Get()
    async getQuoteOfTheDay() {
        return this.quoteService.getQuoteOfTheDay();
    }
}