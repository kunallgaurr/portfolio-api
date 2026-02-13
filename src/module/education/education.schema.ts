import {
    IsDateString,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class AddEducationSchema {
    @IsString()
    @MinLength(2)
    institution: string;

    @IsString()
    @MinLength(2)
    degree: string;

    @IsString()
    @MinLength(2)
    fieldOfStudy: string;

    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateEducationSchema {
    @IsOptional()
    @IsString()
    @MinLength(2)
    institution?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    degree?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    fieldOfStudy?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

