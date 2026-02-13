import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Education } from "./education.entity";
import { EducationService } from "./education.service";
import { EducationController } from "./education.controller";
import { EducationRepository } from "./education.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Education])
    ],
    controllers: [EducationController],
    providers: [EducationService, EducationRepository],
    exports: [EducationService]
})
export class EducationModule {}
