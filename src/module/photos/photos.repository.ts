import { Injectable } from "@nestjs/common";
import { BasePostgresRepository } from "src/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MediaAsset } from "./photos.entity";

@Injectable()
export class MediaAssetRepository extends BasePostgresRepository<MediaAsset> {
    constructor(
        @InjectRepository(MediaAsset)
        repository: Repository<MediaAsset>
    ) {
        super(repository);
    }
}
