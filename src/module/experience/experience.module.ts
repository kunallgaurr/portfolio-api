import { Module } from '@nestjs/common';
import { ExperiencePointRepository, ExperienceRepository } from './repositories';
import { ExperienceService } from './experience.service';
import { ExerienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience, ExperiencePoint } from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Experience,
            ExperiencePoint
        ])
    ],
    controllers: [
        ExerienceController
    ],
    providers: [
        ExperienceRepository,
        ExperiencePointRepository,
        ExperienceService
    ],
})
export class ExperienceModule { }
