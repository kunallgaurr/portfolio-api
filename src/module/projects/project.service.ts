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
        return repos.map((repo) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private,
            url: repo.html_url,
            description: repo.description,
            size: repo.size,
            stargazersCount: repo.stargazers_count,
            watchersCount: repo.watchers_count,
            openIssuesCount: repo.open_issues_count,
            forksCount: repo.forks_count,
            forks: repo.forks,
            watchers: repo.watchers,
            defaultBranch: repo.default_branch,
            topics: repo.topics ?? [],
            visibility: repo.visibility ?? undefined,
            gitUrl: repo.git_url,
            sshUrl: repo.ssh_url,
            cloneUrl: repo.clone_url,
            svnUrl: repo.svn_url,
            language: repo.language,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
        }));
    }
}