import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities";
import { PostsRepository } from "./repositories";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostsRepository, PostsService],
    exports: [PostsService],
})
export class PostsModule {}
