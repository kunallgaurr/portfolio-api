const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics?: string[];
    language: string | null;
    stargazers_count: number;
    fork: boolean;
}

export interface ProjectFromGitHub {
    title: string;
    description: string | null;
    githubUrl: string;
    liveUrl: string | null;
    techStack: string[];
}

/**
 * Fetches public repos for a GitHub username and maps them to project-like DTOs.
 */
export async function fetchPublicReposAsProjects(
    username: string,
): Promise<ProjectFromGitHub[]> {
    const url = `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`;
    const res = await fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" },
        signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
        if (res.status === 404) throw new Error(`GitHub user not found: ${username}`);
        throw new Error(`GitHub API error: ${res.status}`);
    }
    const repos: GitHubRepo[] = await res.json();

    return repos
        .filter((r) => !r.fork)
        .map((r) => ({
            title: r.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            description: r.description,
            githubUrl: r.html_url,
            liveUrl: r.homepage && r.homepage.startsWith("http") ? r.homepage : null,
            techStack: r.topics ?? (r.language ? [r.language] : []),
        }));
}
