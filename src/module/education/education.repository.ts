import { Injectable } from "@nestjs/common";
import { BasePostgresRepository } from "src/core";
import { Education } from "./education.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EducationRepository extends BasePostgresRepository<Education> {
    constructor(
        @InjectRepository(Education)
        repository: Repository<Education>
    ) {
        super(repository)
    }
}