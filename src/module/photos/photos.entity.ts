import { BaseEntity } from 'src/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('media_assets')
export class MediaAsset extends BaseEntity {

    @Index({ unique: true })
    @Column()
    key: string;

    @Index({ unique: true })
    @Column()
    publicId: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'jsonb' })
    variants: {
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
}
