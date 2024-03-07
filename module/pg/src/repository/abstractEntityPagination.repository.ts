import { ObjectLiteral } from 'typeorm';
import { AbstractEntityRepository } from './abstractEntity.repository';

export abstract class AbstractEntityPaginationRepository<
    Entity extends ObjectLiteral
> extends AbstractEntityRepository<Entity> {
    public abstract getPagination(option: any): Promise<any>;
}
