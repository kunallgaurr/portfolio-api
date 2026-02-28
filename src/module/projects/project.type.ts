export interface AddProjectParams {
    title: string;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    isFeatured?: boolean;
    techStack?: string[];
    points: string[];
}

export interface GetAllProjectsParams {
    pageNumber?: number;
    pageSize?: number;
}

export interface PorjectPoint {
    content: string;
    order: number;
}

export interface UpdateProjectParams {
    title?: string;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    isFeatured?: boolean;
    techStack?: string[];
    points?: PorjectPoint[];
}