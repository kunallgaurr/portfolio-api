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

    @Put('/:experienceId')
    async editExperience(@Param() experienceId: string, @Body() body) {
        return await this.experienceService.editExperience(experienceId, body);
    }

    @Delete('/:experienceId')
    async removeExperience(@Param() experienceId: string) {
        return await this.experienceService.deleteExperience(experienceId);
    }

    @Post('/point')
    async addExperiencePoint(@Body() body) {
        return await this.experienceService.deleteExperience(body);
    }
    @Delete('/point/:experiencePointId')
    async editExperiencePoint(@Param() experiencePointId: string) {
        return await this.experienceService.editExperiencePoint(experiencePointId);
    }
    @Delete('/point/:experiencePointId')
    async removeExperiencePoint(@Param() experiencePointId: string) {
        return await this.experienceService.removeExperiencePoint(experiencePointId);
    }
}