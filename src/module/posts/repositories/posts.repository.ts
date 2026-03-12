import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BasePostgresRepository } from "src/core";
import { Post } from "../entities";

export class PostsRepository extends BasePostgresRepository<Post> {
    constructor(
        @InjectRepository(Post)
        repository: Repository<Post>,
    ) {
        super(repository);
    }
}
