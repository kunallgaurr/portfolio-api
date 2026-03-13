import z, { ZodError, ZodSchema } from "zod";
import { config, InternalServerError } from "src/utils";

export class HashnodeAdapter {
    private async call<T>(
        query: string,
        variables: Record<string, unknown>,
        schema: ZodSchema<T>,
    ): Promise<T> {
        try {
            const response = await fetch(config.HASHNODE_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${config.HASHNODE_ACCESS_TOKEN}`,
                },
                body: JSON.stringify({ query, variables }),
            });

            const json = await response.json();
            if (!response.ok || json.errors) {
                throw new InternalServerError("Hashnode Adapter: GQL error");
            }

            return schema.parse(json.data);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new InternalServerError(
                    "Hashnode Adapter: Response schema validation failed",
                );
            }

            throw new InternalServerError();
        }
    }

    async getPostsByUser(username: string, page = 1, pageSize = 10) {
        const query = `
            query PostsByUser($username: String!, $page: Int!, $pageSize: Int!) {
                user(username: $username) {
                    posts(page: $page, pageSize: $pageSize) {
                        edges {
                            node {
                                id
                                title
                                slug
                                brief
                                publishedAt
                                url
                                coverImage {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        `;

        const schema = z.object({
            user: z
                .object({
                    posts: z.object({
                        edges: z.array(
                            z.object({
                                node: z.object({
                                    id: z.string(),
                                    title: z.string(),
                                    slug: z.string(),
                                    brief: z.string().nullable(),
                                    publishedAt: z.string(),
                                    url: z.string().url(),
                                    coverImage: z
                                        .object({
                                            url: z.string().url(),
                                        })
                                        .nullable(),
                                }),
                            }),
                        ),
                    }),
                })
                .nullable(),
        });

        return this.call(query, { username, page, pageSize }, schema);
    }

    async getPostBySlug(username: string, slug: string) {
        const host = `${username}.hashnode.dev`;
        const query = `
            query PostBySlug($host: String!, $slug: String!) {
                publication(host: $host) {
                    post(slug: $slug) {
                        id
                        title
                        slug
                        brief
                        publishedAt
                        url
                        coverImage {
                            url
                        }
                        content {
                            markdown
                        }
                    }
                }
            } 
        `;

        const schema = z.object({
            publication: z
                .object({
                    post: z
                        .object({
                            id: z.string(),
                            title: z.string(),
                            slug: z.string(),
                            brief: z.string().nullable(),
                            publishedAt: z.string(),
                            url: z.string().url(),
                            coverImage: z
                                .object({
                                    url: z.string().url(),
                                })
                                .nullable(),
                            content: z.object({
                                markdown: z.string(),
                            }),
                        })
                        .nullable(),
                })
                .nullable(),
        });

        return this.call(query, { host, slug }, schema);
    }
}

