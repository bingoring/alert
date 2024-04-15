import { AbstractEntityRepository } from '@root/pg/repository/abstractEntity.repository';
import { ObjectLiteral } from 'typeorm';
import { AbstractPostLoadStrategy } from './postLoad.strategy';

export class NonActionStrategy extends AbstractPostLoadStrategy {
    public override async exec(_repository: AbstractEntityRepository<ObjectLiteral>): Promise<void> {
        return undefined;
    }
}
