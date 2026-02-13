import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('/health-check')
    getHello() {
        return this.appService.healthCheck();
    }

    @Get('/')
    welcomeMessage() {
        return this.appService.welcomeMessage();
    }
}
