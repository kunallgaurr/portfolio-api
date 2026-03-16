import { GithubRepoListSchema, GithubRepoSchema } from "./github.schema";
import { z } from "zod";

export interface GithubParams {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers: Record<string, string>;
}

export type GithubRepoList = z.infer<typeof GithubRepoListSchema>;
export type GithubRepo = z.infer<typeof GithubRepoSchema>;