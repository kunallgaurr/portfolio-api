import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ContactRepository } from "./contact.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "./contact.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Contact])
    ],
    controllers: [ContactController],
    providers: [ContactRepository, ContactService]
})
export class ContactModule { }