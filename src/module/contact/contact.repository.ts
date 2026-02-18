import { BasePostgresRepository } from "src/core";
import { Contact } from "./contact.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactRepository extends BasePostgresRepository<Contact> {
    constructor(@InjectRepository(Contact) repository: Repository<Contact>) {
        super(repository)
    }
}