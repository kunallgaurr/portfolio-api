import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { config } from 'src/utils';

@Injectable()
export class CloudinaryAdapter {

    constructor() {
        cloudinary.config({
            cloud_name: config.CLOUDINARY_ENVIRONMENT_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_SECRET_KEY,
        });
    }

    async uploadImage(
        filePath: string,
        folder: string = 'portfolio'
    ): Promise<UploadApiResponse> {
        return await cloudinary.uploader.upload(filePath, {
            folder,
        });
    }

    async deleteImage(publicId: string) {
        return await cloudinary.uploader.destroy(publicId);
    }

    async uploadBuffer(
        buffer: Buffer,
        folder: string = 'portfolio'
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result as UploadApiResponse);
                }
            );

            stream.end(buffer);
        });
    }

    generateUrl(publicId: string, width: number): string {
        return cloudinary.url(publicId, {
            width,
            crop: "scale",
            quality: "auto",
            fetch_format: "auto",
        });
    }
}
