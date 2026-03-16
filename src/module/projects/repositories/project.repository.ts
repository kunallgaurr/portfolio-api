import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities";
import { Repository } from "typeorm";
import { BasePostgresRepository } from "src/core";

export class ProjectRepository extends BasePostgresRepository<Project> {
    constructor(
        @InjectRepository(Project)
        repository: Repository<Project>
    ) {
        super(repository);
    }
}
