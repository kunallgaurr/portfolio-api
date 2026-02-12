import { Injectable } from "@nestjs/common";
import { ExperiencePointRepository, ExperienceRepository } from "./repositories";
import { Experience, ExperiencePoint } from "./entities";

@Injectable()
export class ExperienceService {
    constructor(
        private readonly experienceRepository: ExperienceRepository,
        private readonly experiencePointRepository: ExperiencePointRepository
    ) { }

    async addExperience(payload) {
        const {
            companyName,
            role,
            startDate,
            endDate,
            points,
            description,
        } = payload;

        const experience = new Experience();

        experience.companyName = companyName;
        experience.role = role;
        experience.description = description;
        experience.startDate = new Date(startDate);
        experience.endDate = endDate ? new Date(endDate) : null;
        experience.isCurrent = !endDate;

        experience.points = points.map((point, index) => {
            const experiencePoint = new ExperiencePoint();
            experiencePoint.content = point;
            experiencePoint.order = index;
            return experiencePoint;
        });

        return await Promise.all([
            this.experienceRepository.save(experience),
            this.experiencePointRepository.save(experience.points)
        ])
    }


    async getAllExperieces(payload) {
        const { pageNumber, pageSize } = payload;

        const normalizedPageNumber = Number(pageNumber ?? 1);
        const normalizedPageSize = Number(pageSize ?? 20);

        const offset = (normalizedPageNumber - 1) * normalizedPageSize;

        const experiences = await this.experienceRepository.find({
            relations: ['points'],
            skip: offset,
            take: normalizedPageSize,
            order: {
                startDate: 'DESC',
                points: {
                    order: 'ASC',
                },
            },
        });

        return experiences;
    };

    async editExperience(id, payload) {
        const experience = await this.experienceRepository.findOne({
            where: { id },
            relations: ['points']
        });

        if (!experience) {
            throw new Error('Experience not found');
        }

        const {
            companyName,
            role,
            startDate,
            endDate,
            description
        } = payload;

        if (companyName) experience.companyName = companyName;
        if (role) experience.role = role;
        if (description) experience.description = description;
        if (startDate) experience.startDate = new Date(startDate);

        experience.endDate = endDate ? new Date(endDate) : null;
        experience.isCurrent = !endDate;

        return await this.experienceRepository.save(experience);
    };


    async deleteExperience(id) {
        const experience = await this.experienceRepository.findOne({
            where: { id }
        });

        if (!experience) {
            throw new Error('Experience not found');
        }

        return await this.experienceRepository.delete({ id });
    };


    async addExperiencePoint(payload) {
        const { experienceId, content } = payload;

        const experience = await this.experienceRepository.findOne({
            where: { id: experienceId },
            relations: ['points']
        });

        if (!experience) {
            throw new Error('Experience not found');
        }

        const experiencePoint = new ExperiencePoint();

        experiencePoint.content = content;
        experiencePoint.order = experience.points.length;
        experiencePoint.experience = experience;

        return await this.experiencePointRepository.save(experiencePoint);
    };


    async editExperiencePoint(payload) {
        const { pointId, content } = payload;

        const point = await this.experiencePointRepository.findOne({
            where: { id: pointId }
        });

        if (!point) {
            throw new Error('Experience point not found');
        }

        point.content = content;

        return await this.experiencePointRepository.save(point);
    };


    async removeExperiencePoint(payload) {
        const { pointId } = payload;

        const point = await this.experiencePointRepository.findOne({
            where: { id: pointId }
        });

        if (!point) {
            throw new Error('Experience point not found');
        }

        return await this.experiencePointRepository.delete({ id: pointId });
    };

}