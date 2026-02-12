import {
    IsArray,
    IsDateString,
    IsOptional,
    IsString,
    ArrayNotEmpty,
} from 'class-validator';

export class AddExperienceSchema {
    @IsString()
    companyName: string;

    @IsString()
    role: string;

    @IsString()
    description: string;

    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    points: string[];
}
