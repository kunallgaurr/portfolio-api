import { IsInt, IsOptional, Max, Min } from "class-validator";

export class ListPostsSchema {
    @IsInt()
    @Min(1)
    @IsOptional()
    @Max(100)
    page?: number;

    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    pageSize?: number;
}