import { IsOptional, IsString, MinLength, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";


export class CreateMediaAssetSchema {

    @IsString()
    @MinLength(2)
    key: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class GetAllPhotosSchema {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageNumber?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50) // Prevent excessive load
    pageSize?: number;
}

