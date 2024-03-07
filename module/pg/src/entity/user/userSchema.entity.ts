import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity({ name: 'user_schema' })
export class UserSchemaEntity {
    @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string = v4();

    @Column({ name: 'login_id', type: 'varchar' })
    loginId!: string;

    @Column({ name: 'schema_name', type: 'varchar' })
    schemaName!: string;
}
