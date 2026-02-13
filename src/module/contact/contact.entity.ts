import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';

@Entity('contacts')
export class Contact extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ default: false })
    isRead: boolean;
}
