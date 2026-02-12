import { InjectRepository } from "@nestjs/typeorm";
import { Experience } from "../entities";
import { Repository } from "typeorm";
import { BasePostgresRepository } from "src/core";

export class ExperienceRepository extends BasePostgresRepository<Experience> {
    constructor(
        @InjectRepository(Experience)
        repository: Repository<Experience>
    ) {
        super(repository);
    }
}