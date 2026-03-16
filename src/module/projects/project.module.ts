import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';
import { Project, ProjectPoint } from './entities';
import { ProjectRepository, ProjectPointRepository } from './repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, ProjectPoint])
    ],
    controllers: [ProjectsController],
    providers: [
        ProjectsService,
        ProjectRepository,
        ProjectPointRepository
    ],
    exports: [ProjectsService]
})
export class ProjectsModule { }