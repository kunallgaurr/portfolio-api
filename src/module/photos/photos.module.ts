import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";
import { MediaAsset } from "./photos.entity";
import { MediaAssetRepository } from "./photos.repository";
import { CloudinaryAdapter } from "src/adapters";

@Module({
    imports: [
        TypeOrmModule.forFeature([MediaAsset]),
    ],
    controllers: [PhotosController],
    providers: [
        PhotosService,
        CloudinaryAdapter,
        MediaAssetRepository
    ],
    exports: [PhotosService],
})
export class PhotosModule {}
