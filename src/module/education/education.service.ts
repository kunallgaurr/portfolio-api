import { Injectable } from "@nestjs/common";
import { EducationRepository } from "./education.repository";
import { Education } from "./education.entity";

@Injectable()
export class EducationService {
    constructor(
        private readonly educationRepository: EducationRepository
    ) {}

    async addEducation(payload) {
        const {
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
        } = payload;

        const education = new Education();

        education.institution = institution;
        education.degree = degree;
        education.fieldOfStudy = fieldOfStudy;
        education.startDate = new Date(startDate);
        education.endDate = endDate ? new Date(endDate) : null;
        education.description = description ?? null;

        return await this.educationRepository.save(education);
    }

    async getAllEducation() {
        return await this.educationRepository.find({
            order: {
                startDate: 'DESC'
            }
        });
    }

    async getEducationById(id) {
        return await this.educationRepository.findOne({
            where: { id }
        });
    }

    async updateEducation(id, payload) {
        const education = await this.educationRepository.findOne({
            where: { id }
        });

        if (!education) {
            throw new Error('Education not found');
        }

        const {
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
        } = payload;

        if (institution) education.institution = institution;
        if (degree) education.degree = degree;
        if (fieldOfStudy) education.fieldOfStudy = fieldOfStudy;
        if (startDate) education.startDate = new Date(startDate);

        education.endDate = endDate ? new Date(endDate) : null;

        if (description !== undefined) {
            education.description = description;
        }

        return await this.educationRepository.save(education);
    }

    async deleteEducation(id) {
        const education = await this.educationRepository.findOne({
            where: { id }
        });

        if (!education) {
            throw new Error('Education not found');
        }

        return await this.educationRepository.delete({ id });
    }
}
