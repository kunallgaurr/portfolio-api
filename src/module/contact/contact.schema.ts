import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";
import { Type } from "class-transformer";

export class RecieveMessageSchema {
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    @MinLength(2, { message: "Name must be at least 2 characters long" })
    @MaxLength(100, { message: "Name must not exceed 100 characters" })
    name: string;

    @IsEmail({}, { message: "Please provide a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @IsString()
    @IsNotEmpty({ message: "Message cannot be empty" })
    @MinLength(10, { message: "Message must be at least 10 characters long" })
    @MaxLength(2000, { message: "Message must not exceed 2000 characters" })
    message: string;
}

export class GetAllMessagesSchema {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageNumber?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize?: number;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    @MinLength(2, { message: "Search query must be at least 2 characters long" })
    @MaxLength(100, { message: "Search query must not exceed 100 characters" })
    q?: string;
}