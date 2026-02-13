import { Injectable } from "@nestjs/common";
import { CloudinaryAdapter } from "src/adapters";
import { BadRequestError } from "src/utils";
import { MediaAssetRepository } from "./photos.repository";
import { MediaAsset } from "./photos.entity";

@Injectable()
export class PhotosService {
    constructor(
        private readonly cloudinary: CloudinaryAdapter,
        private readonly mediaAssetRepository: MediaAssetRepository,

    ) { }

    async upload(payload) {
        const { file, key, description } = payload;

        const existing = await this.mediaAssetRepository.findOne({
            where: { key }
        });

        if (existing) throw new BadRequestError("Media asset with this key already exists");
        if (!file) throw new BadRequestError("One image file is required");
        if (Array.isArray(file)) throw new BadRequestError("Only one image is allowed");
        if (!file.mimetype.startsWith("image/")) throw new BadRequestError("Only image files are allowed");
        if (!file || !file.mimetype.startsWith("image/")) throw new BadRequestError("Only image files are allowed");

        const uploadResult = await this.cloudinary.uploadBuffer(
            file.buffer,
            "portfolio"
        );

        const publicId = uploadResult.public_id;

        const variants = {
            sm: this.cloudinary.generateUrl(publicId, 480),
            md: this.cloudinary.generateUrl(publicId, 768),
            lg: this.cloudinary.generateUrl(publicId, 1024),
            xl: this.cloudinary.generateUrl(publicId, 1440),
        };

        const mediaAsset = new MediaAsset();

        mediaAsset.key = key;
        mediaAsset.publicId = publicId;
        mediaAsset.description = description ?? null;
        mediaAsset.variants = variants;

        return await this.mediaAssetRepository.save(mediaAsset);
    }

    async getAllPhotos(payload) {
        const pageNumber = Number(payload.pageNumber ?? 1);
        const pageSize = Number(payload.pageSize ?? 5);


        return await this.mediaAssetRepository.find({
            skip: (pageNumber - 1) * pageSize,
            take: pageSize
        });
    }
}