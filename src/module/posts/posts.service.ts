import { Inject, Injectable } from "@nestjs/common";
import { HashnodeAdapter } from "src/adapters/hashnode/hashnode.adapter";
import { ListPostsQuery } from "./posts.types";

@Injectable()
export class PostsService {

    constructor(@Inject(HashnodeAdapter) private readonly hashnodeAdapter  : HashnodeAdapter) {}

    async getAllPosts(username: string, query: ListPostsQuery) {
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 10;

        const data = await this.hashnodeAdapter.getPostsByUser(username, page, pageSize);

        const edges = data.user?.posts.edges ?? [];

        return edges.map(({ node }) => ({
            id: node.id,
            title: node.title,
            slug: node.slug,
            brief: node.brief,
            publishedAt: node.publishedAt,
            url: node.url,
            imageUrl: node.coverImage?.url ?? null,
        }));
    }

    async getPostBySlug(username: string, slug: string) {
        const data = await this.hashnodeAdapter.getPostBySlug(username, slug);
        
        const post = data.publication?.post;

        if (!post) {
            return null;
        }

        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            brief: post.brief,
            publishedAt: post.publishedAt,
            url: post.url,
            imageUrl: post.coverImage?.url ?? null,
            content: post.content.markdown,
        };
    }
}

