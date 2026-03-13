import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { HashnodeAdapter } from "src/adapters/hashnode";

@Module({
    imports: [],
    controllers: [PostsController],
    providers: [PostsService, HashnodeAdapter],
    exports: [PostsService, HashnodeAdapter],
})
export class PostsModule {}

