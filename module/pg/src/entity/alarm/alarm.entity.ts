import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DefaultEntity } from '../default/default.entity';
import { v4 } from 'uuid';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'alarm' })
export class AlarmEntity extends DefaultEntity {
    @PrimaryColumn({ name: 'alarm_id', type: 'uuid' })
    alarmId: string = v4();

    @Column({ name: 'alarm_name', type: 'varchar', nullable: true })
    alarmName?: string;

    @Column({ name: 'alarm_time', type: 'datetime' })
    alarmTime!: Date;

    @Column({ name: 'alarm_type', type: 'varchar' })
    alarmType!: string;

    @Column({ name: 'is_activated', type: 'boolean', nullable: true })
    isActivated!: boolean;

    @ManyToOne(() => UserEntity, (obj) => obj.alarmList, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user?: UserEntity;
}
