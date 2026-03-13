import { Injectable } from "@nestjs/common";
import { FindManyOptions } from 'typeorm';
import { ProjectPointRepository, ProjectRepository } from "./repositories";
import { Project, ProjectPoint } from "./entities";
import { AddProjectParams, GetAllProjectsParams, UpdateProjectParams } from "./project.type";
import { getPreviewImageFromUrl } from "./preview-from-url.util";
import { fetchPublicReposAsProjects, ProjectFromGitHub } from "./github-repos.util";

@Injectable()
export class ProjectsService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly projectPointRepository: ProjectPointRepository
    ) { }

    async addProject(payload: AddProjectParams) {
        const project = new Project();
        project.points = [];

        project.title = payload.title;
        project.githubUrl = payload.githubUrl;
        project.liveUrl = payload.liveUrl;
        project.imageUrl = payload.imageUrl;
        project.isFeatured = payload.isFeatured ?? false;
        project.techStack = payload.techStack;

        for (let i = 0; i < (payload.points || []).length; i++) {
            const point = payload.points[i];
            const projectPoint = new ProjectPoint();
            projectPoint.content = point;
            projectPoint.order = i;
            project.points.push(projectPoint);
        }

        return await this.projectRepository.save(project);
    }

    /** Fetches og:image from project's liveUrl and sets imageUrl. */
    async fetchPreviewForProject(projectId: string): Promise<Project | null> {
        const project = await this.projectRepository.findOne({ where: { id: projectId } });
        if (!project?.liveUrl) return project;
        const imageUrl = await getPreviewImageFromUrl(project.liveUrl);
        if (imageUrl) {
            await this.projectRepository.update({ id: projectId }, { imageUrl });
            return this.getProjectById(projectId);
        }
        return this.getProjectById(projectId);
    }

    /** Returns public GitHub repos as project-like objects (does not save to DB). */
    async getProjectsFromGitHub(username: string): Promise<ProjectFromGitHub[]> {
        return fetchPublicReposAsProjects(username);
    }

    async getAllProjects({ pageNumber, pageSize }: GetAllProjectsParams) {
        pageNumber = pageNumber ?? 1;
        pageSize = pageSize ?? 10;

        const take = pageSize ?? 10;
        const skip = (pageNumber - 1) * pageSize;

        const options: FindManyOptions = {
            take,
            skip,
            relations: ['points'],
            order: {
                createdAt: 'DESC'
            }
        };

        const items = await this.projectRepository.find(options);
        return items;
    }

    async getProjectById(id: string) {
        return await this.projectRepository.findOne({
            where: {
                id
            },
            relations: ['points']
        });
    }

    async updateProject(id: string, payload: UpdateProjectParams) {
        const dataToUpdate: Partial<Project> = {
            title: payload.title,
            githubUrl: payload.githubUrl,
            liveUrl: payload.liveUrl,
            imageUrl: payload.imageUrl,
            isFeatured: payload.isFeatured,
            techStack: payload.techStack,
        };

        const pointsToUpdate = payload.points;

        await this.projectRepository.update({ id }, dataToUpdate);


        
        return await this.getProjectById(id);
    }

    async deleteProject(id: string) {
        return await this.projectRepository.delete({ id });
    }
}