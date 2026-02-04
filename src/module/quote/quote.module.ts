import { Module } from "@nestjs/common";
import { QuoteService } from "./quote.service";
import { ZenQuotesAdapter } from "src/adapters/zen-quotes/zen-quoates.adapter";
import { QuoteController } from "./quote.controller";

@Module({
    imports: [],
    controllers: [QuoteController],
    providers: [QuoteService, ZenQuotesAdapter],
})
export class QuoteModule {}