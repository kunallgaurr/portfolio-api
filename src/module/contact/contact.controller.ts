import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { RecieveMessageSchema } from "./contact.schema";

@Controller('contact')
export class ContactController {
    constructor(
        @Inject(ContactService) private readonly contactService: ContactService
    ){}

    @Post()
    async recieveMessage(@Body() body: RecieveMessageSchema) {
        return await this.contactService.recieveMessage(body)
    }
}