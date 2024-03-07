import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'settings' })
export class SettingEntity {
    @PrimaryColumn({ name: 'settings_id', type: 'uuid' })
    settingsId!: string;

    @Column({ name: 'name', type: 'varchar' })
    name!: string;

    @Column({ name: 'value', type: 'jsonb' })
    value!: any;

    @Column({ name: 'updated_by', type: 'varchar', nullable: true })
    updatedBy!: string;

    @Column({ name: 'created_by', type: 'varchar' })
    createdBy!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: string;
}
