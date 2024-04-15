import { AbstractEntityRepository } from '@root/pg/repository/abstractEntity.repository';
import { ObjectLiteral } from 'typeorm';

export abstract class AbstractPostLoadStrategy {
    public abstract exec(repository: AbstractEntityRepository<ObjectLiteral>): Promise<void>;
}
