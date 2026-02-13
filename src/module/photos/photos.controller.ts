import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PhotosService } from "./photos.service";
import { CreateMediaAssetSchema, GetAllPhotosSchema } from "./photos.schema";

@Controller('photos')
export class PhotosController {
    constructor(
        private readonly photosService: PhotosService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File, @Body() body: CreateMediaAssetSchema) {
        return await this.photosService.upload({file, ...body});
    }

    @Get()
    async getAllPhotos(@Query() query: GetAllPhotosSchema) {
        return await this.photosService.getAllPhotos(query);
    }
}