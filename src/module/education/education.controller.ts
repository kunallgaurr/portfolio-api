import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from "@nestjs/common";
import { EducationService } from "./education.service";
import { AddEducationSchema, UpdateEducationSchema } from "./education.schema";

@Controller('education')
export class EducationController {
    constructor(
        private readonly educationService: EducationService
    ) {}

    @Post('/')
    async addEducation(@Body() body: AddEducationSchema) {
        return await this.educationService.addEducation(body);
    }

    @Get('/')
    async getAllEducation() {
        return await this.educationService.getAllEducation();
    }

    @Get('/:id')
    async getEducationById(@Param('id') id: string) {
        return await this.educationService.getEducationById(id);
    }

    @Patch('/:id')
    async updateEducation(
        @Param('id') id: string,
        @Body() body: UpdateEducationSchema
    ) {
        return await this.educationService.updateEducation(id, body);
    }

    @Delete('/:id')
    async deleteEducation(@Param('id') id: string) {
        return await this.educationService.deleteEducation(id);
    }
}
