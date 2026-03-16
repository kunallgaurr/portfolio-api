import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';
import { GithubAdapter } from "src/adapters/github";

@Module({
    imports: [],
    controllers: [ProjectsController],
    providers: [
        ProjectsService,
        GithubAdapter
    ],
    exports: [ProjectsService]
})
export class ProjectsModule { }