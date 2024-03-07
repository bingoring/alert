import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 } from 'uuid';
import { UserEntity } from './user.entity';

@Entity({ name: 'group' })
export class GroupEntity {
    @PrimaryColumn({ name: 'group_id', type: 'uuid' })
    groupId: string = v4();

    @Column({ name: 'name', type: 'varchar' })
    name!: string;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description?: string;

    @Column({ name: 'created_by', type: 'varchar' })
    createdBy?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: string;

    @Column({ name: 'updated_by', type: 'varchar', nullable: true })
    updatedBy?: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
    updatedAt!: string;

    @ManyToMany(() => UserEntity, (obj) => obj.groupList)
    userList?: UserEntity[];
}
