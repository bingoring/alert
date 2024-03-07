import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pipeline' })
export class PipelineEntity {
    @PrimaryColumn({ name: 'target_id', type: 'uuid' })
    targetId!: string;

    @Column({ name: 'tenant_id', type: 'varchar' })
    tenantId!: string;

    @Column({ name: 'config', type: 'jsonb' })
    config!: Record<string, any>;

    @Column({ name: 'collect_offset', type: 'varchar' })
    collectOffset!: string;
}
