import { Inject, Injectable } from "@nestjs/common";
import e from "express";
import { BasePostgresRepository } from "src/core";
import { Visitor } from "./visitors.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class VisitorsRepository extends BasePostgresRepository<Visitor> {
    constructor(@InjectRepository(Visitor) repository: Repository<Visitor>) {
        super(repository);
    }
}