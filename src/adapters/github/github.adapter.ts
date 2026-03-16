import { config, InternalServerError } from "src/utils";
import z, { ZodError, ZodSchema } from "zod";
import { GithubParams } from "./github.types";
import { Injectable } from "@nestjs/common";
import { GithubReadmeContentSchema, GithubRepoListSchema, GithubRepoSchema } from "./github.schema";

@Injectable()
export class GithubAdapter {
    constructor() { }

    private async call<T>(
        params: GithubParams,
        schema: ZodSchema<T>,
    ): Promise<T> {
        const url = new URL(config.GITHUB_BASE_URL + params.url);
        
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${config.GITHUB_ACCESS_TOKEN}`);
        headers.set('Content-Type', 'application/json');

        for(const [key, value] of Object.entries(params.headers)) {
            headers.set(key, value);
        }

        let response;
        try {
            response = await fetch(url, {
                method: params.method,
                headers,
            });
        } catch (error) {
            console.error(error);
            throw new InternalServerError('Github Adapter: API error');
        }

        if (!response.ok) {
            console.error(response);
            throw new InternalServerError('Github Adapter: API error');
        }

        let json;
        try {
            json = await response.json();
        } catch (error) {
            throw new InternalServerError('Github Adapter: Invalid JSON response');
        }

        try {
            return schema.parse(json);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new InternalServerError('Github Adapter: Response schema validation failed');
            }

            throw new InternalServerError('Github Adapter: API error');
        }
    }

    /** Same as call but returns null on 404 (e.g. missing README). */
    private async callOptional<T>(
        params: GithubParams,
        schema: ZodSchema<T>,
    ): Promise<T | null> {
        const url = new URL(config.GITHUB_BASE_URL + params.url);
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${config.GITHUB_ACCESS_TOKEN}`);
        headers.set('Content-Type', 'application/json');
        for (const [key, value] of Object.entries(params.headers)) {
            headers.set(key, value);
        }
        let response: Response;
        try {
            response = await fetch(url, { method: params.method, headers });
        } catch (error) {
            console.error(error);
            throw new InternalServerError('Github Adapter: API error');
        }
        if (response.status === 404) return null;
        if (!response.ok) {
            console.error(response);
            throw new InternalServerError('Github Adapter: API error');
        }
        let json: unknown;
        try {
            json = await response.json();
        } catch {
            throw new InternalServerError('Github Adapter: Invalid JSON response');
        }
        try {
            return schema.parse(json) as T;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new InternalServerError('Github Adapter: Response schema validation failed');
            }
            throw new InternalServerError('Github Adapter: API error');
        }
    }

    async getUserRepos(username: string) {
        const params: GithubParams = {
            method: 'GET',
            url: `/users/${username}/repos`,
            headers: {},
        };

        return this.call(params, GithubRepoListSchema);
    }

    async getSingleRepo(username: string, repo: string) {
        const params: GithubParams = {
            method: 'GET',
            url: `/repos/${username}/${repo}`,
            headers: {},
        };

        return await this.call(params, GithubRepoSchema);
    }

    /** Fetches repo README.md content (decoded). Returns null if no README or 404. */
    async getRepoReadme(owner: string, repo: string): Promise<string | null> {
        const params: GithubParams = {
            method: 'GET',
            url: `/repos/${owner}/${repo}/readme`,
            headers: {},
        };
        
        const parsed = await this.callOptional(params, GithubReadmeContentSchema);
        if (!parsed || parsed.encoding !== 'base64') return null;
        return Buffer.from(parsed.content, 'base64').toString('utf-8');
    }
}