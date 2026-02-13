import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity('education')
export class Education extends BaseEntity {
    @Column()
    institution: string;

    @Column()
    degree: string;

    @Column()
    fieldOfStudy: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date | null;

    @Column({ type: 'text', nullable: true })
    description: string;
}
