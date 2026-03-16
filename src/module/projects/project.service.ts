import { Inject, Injectable } from "@nestjs/common";
import { GithubAdapter, GithubRepoList } from "src/adapters/github";
import { config } from "src/utils";

/**
 * GET /projects returns { status: { code, message, timestamp }, data: <formatted repos> }.
 * Use response.data to get the formatted projects array.
 */
@Injectable()
export class ProjectsService {
    private readonly GITHUB_USERNAME = config.GITHUB_USERNAME;

    constructor(
        @Inject(GithubAdapter)
        private readonly githubAdapter: GithubAdapter,
    ) {}

    async getProjects() {
        const repos = await this.githubAdapter.getUserRepos(this.GITHUB_USERNAME);
        return this.formatRepo(repos);
    }

    private formatRepo(repos: GithubRepoList) {
        return repos.map((repo) => {
            const object = {
                id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                url: repo.html_url,
                description: repo.description,
                size: repo.size,
                stargazersCount: repo.stargazers_count,
                watchersCount: repo.watchers_count,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at,
                pushedAt: repo.pushed_at,
            }

            return object;
        });
    }

    async getOneProject(slug: string) {
        const [project, readme] = await Promise.all([
            this.githubAdapter.getSingleRepo(this.GITHUB_USERNAME, slug),
            this.githubAdapter.getRepoReadme(this.GITHUB_USERNAME, slug),
        ]);

        return {
            id: project.id,
            name: project.name,
            fullName: project.full_name,
            private: project.private,
            url: project.html_url,
            description: project.description,
            size: project.size,
            stargazersCount: project.stargazers_count,
            watchersCount: project.watchers_count,
            openIssuesCount: project.open_issues_count,
            forksCount: project.forks_count,
            forks: project.forks,
            watchers: project.watchers,
            defaultBranch: project.default_branch,
            topics: project.topics ?? [],
            visibility: project.visibility ?? undefined,
            gitUrl: project.git_url,
            sshUrl: project.ssh_url,
            cloneUrl: project.clone_url,
            svnUrl: project.svn_url,
            language: project.language,
            createdAt: project.created_at,
            updatedAt: project.updated_at,
            pushedAt: project.pushed_at,
            readme: readme ?? null,
        };
    } 
}