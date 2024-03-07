import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DefaultEntity {
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', select: false })
    deletedAt?: string | null;
}
