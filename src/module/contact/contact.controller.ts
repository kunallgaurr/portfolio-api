import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { GetAllMessagesSchema, RecieveMessageSchema } from "./contact.schema";

@Controller('contact')
export class ContactController {
    constructor(
        @Inject(ContactService) private readonly contactService: ContactService
    ){}

    @Post()
    async recieveMessage(@Body() body: RecieveMessageSchema) {
        return await this.contactService.recieveMessage(body)
    }

    @Get()
    async getAllMessages(@Query() query: GetAllMessagesSchema) {
        return await this.contactService.getAllMessages(query);
    }

    @Get(':id')
    async getMessageById(@Param('id') id: string) {
        return await this.contactService.getMessageById(id);
    }
}