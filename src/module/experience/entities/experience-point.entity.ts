import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Experience } from './experience.entity';
import { BaseEntity } from 'src/core';

@Entity('experience_points')
export class ExperiencePoint extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Experience, (experience) => experience.points, {
    onDelete: 'CASCADE',
  })
  experience: Experience;
}
