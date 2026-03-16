export interface Project {
    id: number; 
    name: string;
    fullName: string;
    private: boolean;
    url: string;
    description: string;
    size: number;
    stargazersCount: number;
    watchersCount: number;
    openIssuesCount: number;
    forksCount: number;
    forks: number;
    watchers: number;
    defaultBranch: string;
    topics: string[];
    visibility: string;
    gitUrl: string;
    sshUrl: string;
    cloneUrl: string;
    svnUrl: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
}