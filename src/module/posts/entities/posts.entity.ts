import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/core";

@Entity("posts")
export class Post extends BaseEntity {
    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    /** Raw markup (e.g. Markdown or HTML) – render on client or via API. */
    @Column({ type: "text" })
    content: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    excerpt: string | null;

    @Column({ type: "timestamptz", nullable: true })
    publishedAt: Date | null;

    @Column({ default: true })
    isDraft: boolean;
}
