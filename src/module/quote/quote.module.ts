import { Module } from "@nestjs/common";
import { QuoteService } from "./quote.service";
import { ZenQuotesAdapter } from "src/adapters/zen-quotes/zen-quoates.adapter";
import { QuoteController } from "./quote.controller";
import { RedisModule } from "src/core/redis";

@Module({
    imports: [RedisModule],
    controllers: [QuoteController],
    providers: [QuoteService, ZenQuotesAdapter],
    exports: [QuoteService],
})
export class QuoteModule {}