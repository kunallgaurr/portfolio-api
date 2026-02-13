import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import { ProjectPoint } from './project-point.entity';
import { BaseEntity } from 'src/core';

@Entity('projects')
export class Project extends BaseEntity {
    @Column()
    title: string;

    @Column({ nullable: true })
    githubUrl: string;

    @Column({ nullable: true })
    liveUrl: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ default: false })
    isFeatured: boolean;

    @Column({ type: 'jsonb', nullable: true })
    techStack: string[];

    @OneToMany(() => ProjectPoint, (point) => point.project, {
        cascade: true,
    })
    points: ProjectPoint[];
}
