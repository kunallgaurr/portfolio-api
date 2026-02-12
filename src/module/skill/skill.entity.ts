import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

export enum SkillCategory {
    FRONTEND = 'frontend',
    BACKEND = 'backend',
    DEVOPS = 'devops',
    DATABASE = 'database',
    OTHER = 'other',
}

@Entity('skills')
export class Skill extends BaseEntity {
    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: SkillCategory,
        default: SkillCategory.OTHER,
    })
    category: SkillCategory;

    @Column({ type: 'int', nullable: true })
    proficiency: number; // 1–100
}
