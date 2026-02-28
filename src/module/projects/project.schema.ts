import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUrl, Max, Min, MinLength } from "class-validator";

export class AddProjectSchema {
    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    @MinLength(2)
    @IsUrl()
    @IsOptional()
    githubUrl?: string;

    @IsString()
    @MinLength(2)
    @IsUrl()
    @IsOptional()
    liveUrl?: string;

    @IsString()
    @MinLength(2)
    @IsUrl()
    @IsOptional()
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @IsOptional()
    @IsArray()
    techStack?: string[];

    @IsArray()
    @IsOptional()
    points: string[];
}

export class GetAllProjectsSchema {

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