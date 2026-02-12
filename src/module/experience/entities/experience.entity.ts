import { Column, Entity, OneToMany } from "typeorm";
import { ExperiencePoint } from "./experience-point.entity";
import { BaseEntity } from "src/core";

@Entity('experiences')
export class Experience extends BaseEntity {
  @Column()
  companyName: string;

  @Column()
  role: string;

  @Column()
  description: string

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ default: false })
  isCurrent: boolean;

  @OneToMany(() => ExperiencePoint, (point) => point.experience, {
    cascade: true,
  })
  points: ExperiencePoint[];
}
