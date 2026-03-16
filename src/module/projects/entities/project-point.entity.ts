import {
    Column,
    Entity,
    ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from 'src/core';

@Entity('project_points')
export class ProjectPoint extends BaseEntity {
    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'int', default: 0 })
    order: number;

    @ManyToOne(() => Project, (project) => project.points, {
        onDelete: 'CASCADE',
    })
    project: Project;
}
