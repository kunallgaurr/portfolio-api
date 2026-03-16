import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Education, Experience, ExperiencePoint, MediaAsset } from "src/module";
import { Contact } from "src/module/contact";
import { config } from "src/utils";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: config.POSTGRES_DB_HOST,
            port: config.POSTGRES_DB_PORT,
            username: config.POSTGRES_DB_USERNAME,
            password: config.POSTGRES_DB_PASSWORD,
            database: config.POSTGRES_DB_NAME,
            entities: [
                Experience,
                ExperiencePoint,
                Education,
                MediaAsset,
                Contact
            ],
            synchronize: true,
            ssl: false,
            
        })
    ]
})
export class PostgresModule {}