import { Controller, Get } from "@nestjs/common";
import { DateService } from "./date.service";

@Controller('date')
export class DateController{
    constructor(
        private readonly dateService: DateService
    ) {}

    @Get()
    async getDateInfo() {
        return this.dateService.getDateInfo();
    }
}