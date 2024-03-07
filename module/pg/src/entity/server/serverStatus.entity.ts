import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PipelineEntity } from '../pipeline/pipeline.entity';
import { ServerNameType } from '@root/common/type/server.type';

@Entity({ name: 'server_status' })
export class ServerStatusEntity {
    @PrimaryColumn({ name: 'server_id', type: 'uuid' })
    serverId!: string;

    @Column({ name: 'server_category', type: 'varchar' })
    serverCategory!: ServerNameType;

    @OneToMany(() => PipelineEntity, (pipeline) => pipeline.logCollector)
    pipelineList?: PipelineEntity[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: string;

    @Column({ name: 'last_ping_at', type: 'timestamptz' })
    lastPingAt!: string;
}
