import { UlidLength } from '@root/pg/constant/typeLength.constant';
import { LogLevelNumberListType } from '@root/pg/type/log.type';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'audit_log' })
export class AuditLogEntity {
    @PrimaryColumn({ name: 'audit_log_id', type: 'varchar', length: UlidLength })
    auditLogId!: string;

    @Column({ name: 'level', type: 'smallint' })
    level!: LogLevelNumberListType;

    @Column({ name: 'category', type: 'varchar', length: 50 })
    category!: string;

    @Column({ name: 'content', type: 'text' })
    content!: string;

    @Column({ name: 'type', type: 'varchar', length: 50 })
    type!: string;

    @Column({ name: 'created_at', type: 'timestamptz' })
    createdAt!: string;

    @CreateDateColumn({ name: 'saved_at' })
    savedAt!: string;

    @Column({ name: 'ip_addr', type: 'varchar', length: 20 })
    ipAddr!: string;

    @Column({ name: 'login_id', type: 'varchar', length: 50 })
    loginId!: string;

    @Column({ name: 'origin', type: 'jsonb' })
    origin!: any;
}
