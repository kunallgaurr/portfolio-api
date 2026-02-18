import { Injectable } from "@nestjs/common";
import { RecieveMailParams } from "./contact.types";
import { Contact } from "./contact.entity";
import { ContactRepository } from "./contact.repository";

@Injectable()
export class ContactService {
    constructor(
        private readonly contactRepository: ContactRepository
    ) { }

    async recieveMessage(payload: RecieveMailParams) {
        const { name, email, message } = payload;

        try {
            const contact = new Contact();
            contact.name = name;
            contact.email = email;
            contact.message = message;
            contact.isRead = false;

            await this.contactRepository.save(contact);
            return true;
        } catch (error) {
            throw error;
        }
    }
}