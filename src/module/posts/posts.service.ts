import { Injectable } from "@nestjs/common";
import { PostsRepository } from "./repositories";
import { Post } from "./entities";

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    /** List published posts (no draft), ordered by publishedAt desc. */
    async findAll(): Promise<Post[]> {
        return this.postsRepository.find({
            where: { isDraft: false },
            order: { publishedAt: "DESC" },
        });
    }

    /** Get one post by id. */
    async findById(id: string): Promise<Post | null> {
        return this.postsRepository.findOne({ where: { id } });
    }

    /** Get one published post by slug (for public blog URLs). */
    async findBySlug(slug: string): Promise<Post | null> {
        return this.postsRepository.findOne({
            where: { slug, isDraft: false },
        });
    }
}
