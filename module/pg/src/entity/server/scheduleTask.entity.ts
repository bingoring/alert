import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'schedule_task' })
export class ScheduleTaskEntity {
    @PrimaryColumn({ type: 'varchar', name: 'task' })
    task!: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: string;

    @Column({ type: 'uuid', nullable: true, name: 'last_task_server' })
    lastTaskServer!: string;
}
