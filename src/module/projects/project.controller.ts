import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProjectsService } from "./project.service";
import { AddProjectSchema, GetAllProjectsSchema } from "./project.schema";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post('/')
    async addProject(@Body() body: AddProjectSchema) {
        return await this.projectsService.addProject(body);
    }

    @Get('/')
    async getAllProjects(@Query() query: GetAllProjectsSchema) {
        return await this.projectsService.getAllProjects(query);
    }

    @Get('/:id')
    async getProject(@Param('id') id: string) {
        return await this.projectsService.getProjectById(id);
    }

    @Patch('/:id')
    async updateProject(@Param('id') id: string, @Body() body: any) {
        return await this.projectsService.updateProject(id, body);
    }

    @Delete('/:id')
    async deleteProject(@Param('id') id: string) {
        return await this.projectsService.deleteProject(id);
    }
}