import { CursorRepositoryOptionType, RepositoryOptionType } from './abstract.type';
import { AbstractRepository } from './abstract.repository';
import { AbstractEntityCursorPagination } from './abstractEntityCursorPagination.repository';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractEntityOffsetPagination } from './abstractEntityOffsetPagination.repository';

export class MockRepository extends AbstractRepository {
    constructor(options: RepositoryOptionType) {
        super(options);
    }

    public getDS() {
        return this.getDataSource();
    }

    public getTenantId() {
        return this.tenantId;
    }
}

@Entity({ name: 'test' })
export class TestEntity {
    @PrimaryColumn({ type: 'text' })
    id!: string;

    @Column({ type: 'text' })
    name!: string;
}

export class MockCursorRepository extends AbstractEntityCursorPagination<TestEntity> {
    constructor(option: CursorRepositoryOptionType<TestEntity>) {
        super(TestEntity, option);
    }
}

export class MockOffsetRepository extends AbstractEntityOffsetPagination<TestEntity> {
    constructor(option: RepositoryOptionType) {
        super(TestEntity, option);
    }
}
