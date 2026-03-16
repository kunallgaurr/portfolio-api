import { config, InternalServerError } from "src/utils";
import z, { ZodError, ZodSchema } from "zod";
import { GithubParams } from "./github.types";
import { Injectable } from "@nestjs/common";
import { GithubRepoListSchema, GithubRepoSchema } from "./github.schema";

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

        return this.call(params, GithubRepoSchema);
    }
}