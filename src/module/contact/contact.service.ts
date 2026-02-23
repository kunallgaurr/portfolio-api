import { Injectable, NotFoundException } from "@nestjs/common";
import { GetAllMessagesParams, RecieveMailParams } from "./contact.types";
import { Contact } from "./contact.entity";
import { ContactRepository } from "./contact.repository";
import { FindOptionsWhere, Like } from "typeorm";

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
    
    async getAllMessages(payload: GetAllMessagesParams): Promise<Contact[]> {
        const { pageNumber, pageSize, type, q } = payload;

        const normalizedPageNumber = Number(pageNumber ?? 1);
        const normalizedPageSize = Number(pageSize ?? 20);

        const offset = (normalizedPageNumber - 1) * normalizedPageSize;

        const where: FindOptionsWhere<Contact> = {};
        if (type === 'unread') {
            where.isRead = false;
        } else if (type === 'read') {
            where.isRead = true;
        }

        if (q) {
            where.name = Like(`%${q}%`);
            where.email = Like(`%${q}%`);
            where.message = Like(`%${q}%`);
        }

        return await this.contactRepository.find({
            where,
            skip: offset,
            take: normalizedPageSize,
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getMessageById(id: string): Promise<Contact> {
        const message = await this.contactRepository.findOne({
            where: { id }
        });

        if (!message) {
            throw new NotFoundException('Message not found');
        }

        return message;
    }   
}