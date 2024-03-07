import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 } from 'uuid';
import { CloudEntity } from '../cloud/cloud.entity';
import { AgentEntity } from '../agent/agent.entity';
import { CloudOrganizationEntity } from '../cloud/cloudOrganization.entity';

@Entity({ name: 'project' })
export class ProjectEntity {
    @PrimaryColumn({ name: 'project_id', type: 'uuid' })
    projectId: string = v4();

    @Column({ name: 'created_by', type: 'varchar' })
    createdBy!: string;

    @Column({ name: 'updated_by', type: 'varchar', nullable: true })
    updatedBy?: string;

    @Column({ name: 'name', type: 'varchar' })
    name!: string;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: string;

    @ManyToMany(() => CloudEntity, (obj) => obj.projectList)
    @JoinTable({
        name: 'project_cloud_assoc',
        joinColumn: {
            name: 'project_id',
            foreignKeyConstraintName: 'project_cloud_assoc_project_id_fk',
        },
        inverseJoinColumn: {
            name: 'cloud_id',
            foreignKeyConstraintName: 'project_cloud_assoc_cloud_id_fk',
        },
    })
    cloudList!: CloudEntity[];

    @ManyToMany(() => AgentEntity, (obj) => obj.projectList)
    @JoinTable({
        name: 'project_agent_assoc',
        joinColumn: {
            name: 'project_id',
            foreignKeyConstraintName: 'project_agent_assoc_project_id_fk',
        },
        inverseJoinColumn: {
            name: 'agent_id',
            foreignKeyConstraintName: 'project_agent_assoc_agent_id_fk',
        },
    })
    agentList!: AgentEntity[];

    @ManyToMany(() => CloudOrganizationEntity, (obj) => obj.projectList)
    @JoinTable({
        name: 'project_cloud_organization_assoc',
        joinColumn: {
            name: 'project_id',
            foreignKeyConstraintName: 'project_cloud_organization_assoc_project_id_fk',
        },
        inverseJoinColumn: {
            name: 'cloud_organization_id',
            foreignKeyConstraintName: 'project_cloud_organization_assoc_cloud_organization_id_fk',
        },
    })
    cloudOrganizationList!: CloudOrganizationEntity[];
}
