import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { DefaultEntity } from '../default/default.entity';
import { v4 } from 'uuid';
import { GroupEntity } from './group.entity';
import { AlarmEntity } from '../alarm/alarm.entity';

@Entity({ name: 'user' })
export class UserEntity extends DefaultEntity {
    @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string = v4();

    @Column({ name: 'organization_id', type: 'uuid' })
    organizationId!: string;

    @Column({ name: 'created_by', type: 'varchar', nullable: true })
    createdBy?: string;

    @Column({ name: 'updated_by', type: 'varchar', nullable: true })
    updatedBy?: string;

    @Column({ name: 'family_name', type: 'varchar' })
    familyName!: string;

    @Column({ name: 'given_name', type: 'varchar' })
    givenName!: string;

    @Column({ name: 'login_id', type: 'varchar' })
    loginId!: string;

    @Column({ name: 'email', type: 'varchar', nullable: true })
    email!: string;

    @Column({ name: 'password', type: 'varchar', nullable: true })
    password!: string;

    @Column({ name: 'is_activated', type: 'boolean', nullable: true })
    isActivated!: boolean;

    @ManyToMany(() => GroupEntity, (obj) => obj.userList)
    @JoinTable({
        name: 'user_group_assoc',
        joinColumn: {
            name: 'user_id',
            foreignKeyConstraintName: 'user_group_assoc_user_id_fk',
        },
        inverseJoinColumn: {
            name: 'group_id',
            foreignKeyConstraintName: 'user_group_assoc_group_id_fk',
        },
    })
    groupList?: GroupEntity[];

    @OneToMany(() => AlarmEntity, (obj) => obj.user)
    alarmList!: AlarmEntity[];
}
