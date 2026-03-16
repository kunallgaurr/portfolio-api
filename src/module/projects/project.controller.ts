import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProjectsService } from "./project.service";
import { AddProjectSchema, GetAllProjectsSchema } from "./project.schema";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }


    @Get()
    async getProjects() {
        return await this.projectsService.getProjects();
    }

}