import { Controller, Get, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    /** List all published posts – returns markup in `content`. */
    @Get()
    async list() {
        return this.postsService.findAll();
    }

    /** Get a published post by slug – use this for blog URLs, e.g. /posts/by-slug/my-first-post. */
    @Get("by-slug/:slug")
    async getBySlug(@Param("slug") slug: string) {
        return this.postsService.findBySlug(slug);
    }

    /** Get a post by id (e.g. for admin or internal use). */
    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.postsService.findById(id);
    }
}
