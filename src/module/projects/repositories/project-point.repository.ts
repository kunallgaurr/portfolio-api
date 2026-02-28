import { InjectRepository } from "@nestjs/typeorm";
import { ProjectPoint } from "../entities";
import { Repository } from "typeorm";
import { BasePostgresRepository } from "src/core";

export class ProjectPointRepository extends BasePostgresRepository<ProjectPoint> {
    constructor(
        @InjectRepository(ProjectPoint)
        repository: Repository<ProjectPoint>
    ) {
        super(repository);
    }
}
