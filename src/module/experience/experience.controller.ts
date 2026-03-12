import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ExperienceService } from "./experience.service";
import { AddExperienceSchema } from "./experience.schema";

@Controller('experience')
export class ExerienceController {
    constructor(
        private readonly experienceService: ExperienceService
    ) {}

    @Post('/')
    async addExperience(@Body() body: AddExperienceSchema) {
        return await this.experienceService.addExperience(body);
    }

    @Get('/')
    async getAllExperiences() {
        return await this.experienceService.getAllExperieces({});
    }

    @Get('/:id')
    async getExperienceById(@Param('id') id: string) {
        return await this.experienceService.getExperienceById(id);
    }

    @Put('/:id')
    async editExperience(@Param('id') id: string, @Body() body) {
        return await this.experienceService.editExperience(id, body);
    }

    @Delete('/:id')
    async removeExperience(@Param('id') id: string) {
        return await this.experienceService.deleteExperience(id);
    }

    @Post('/point')
    async addExperiencePoint(@Body() body) {
        return await this.experienceService.deleteExperience(body);
    }

    @Delete('/point/:id')
    async editExperiencePoint(@Param('id') id: string) {
        return await this.experienceService.editExperiencePoint(id);
    }

    @Delete('/point/:id')
    async removeExperiencePoint(@Param('id') id: string) {
        return await this.experienceService.removeExperiencePoint(id);
    }
}