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

    /** Fetch your public GitHub repos as project-like list (does not save to DB). */
    @Get('from-github')
    async getFromGitHub(@Query('username') username: string) {
        if (!username?.trim()) {
            return { error: 'Query param "username" is required', example: '/projects/from-github?username=your-github-username' };
        }
        return await this.projectsService.getProjectsFromGitHub(username.trim());
    }

    /** Fetch preview image from project's liveUrl (og:image) and set as imageUrl. */
    @Patch(':id/fetch-preview')
    async fetchPreview(@Param('id') id: string) {
        return await this.projectsService.fetchPreviewForProject(id);
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