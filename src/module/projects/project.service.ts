import { Inject, Injectable } from "@nestjs/common";
import { GithubAdapter } from "src/adapters/github";
import { config } from "src/utils";


@Injectable()
export class ProjectsService {
    private readonly GITHUB_USERNAME = config.GITHUB_USERNAME;
    constructor(
        @Inject(GithubAdapter)
        private readonly githubAdapter: GithubAdapter,
    ) { }

    async getProjects() {
        return await this.githubAdapter.getUserRepos(this.GITHUB_USERNAME);
    }

}