import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'organization_schema' })
export class OrganizationSchemaEntity {
    @PrimaryColumn({ name: 'organization_id', type: 'uuid' })
    organizationId: string = v4();

    @Column({ name: 'schema_name', type: 'varchar' })
    schemaName!: string;
}
