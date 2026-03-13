import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { ListPostsSchema } from "./posts.shema";

const HASHNODE_USERNAME = "kunalgaur";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async list(@Query() query: ListPostsSchema) {
        return this.postsService.getAllPosts(HASHNODE_USERNAME, query);
    }

    @Get(":slug")
    async getBySlug(@Param("slug") slug: string) {
        return await this.postsService.getPostBySlug(
            HASHNODE_USERNAME,
            slug,
        );
    }
}

