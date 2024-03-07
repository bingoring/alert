import { CreateDateColumn, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

export class DefaultDashboardEntity {
    @PrimaryColumn({ name: 'id', type: 'varchar' })
    id: string = ulid();

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: string;
}
