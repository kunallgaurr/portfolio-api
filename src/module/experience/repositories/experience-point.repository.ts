import { InjectRepository } from "@nestjs/typeorm";
import { ExperiencePoint } from "../entities";
import { Repository } from "typeorm";
import { BasePostgresRepository } from "src/core";

export class ExperiencePointRepository extends BasePostgresRepository<ExperiencePoint> {
    constructor(
        @InjectRepository(ExperiencePoint)
        repository: Repository<ExperiencePoint>
    ) {
        super(repository);
    }
}