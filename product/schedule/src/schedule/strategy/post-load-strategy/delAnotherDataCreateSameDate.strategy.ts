import { AbstractEntityRepository } from '@root/pg/repository/abstractEntity.repository';
import { ObjectLiteral } from 'typeorm';
import { AbstractPostLoadStrategy } from './postLoad.strategy';

export class DeleteAnotherDataCreateSameDateStrategy extends AbstractPostLoadStrategy {
    public override async exec(repository: AbstractEntityRepository<ObjectLiteral>): Promise<void> {
        const subQuery = repository
            .createQueryBuilder()
            .select('id')
            .where('created_at >= CURRENT_DATE')
            .andWhere("created_at < CURRENT_DATE + INTERVAL '1 day'")
            .orderBy('id', 'DESC')
            .limit(1);

        await repository
            .createQueryBuilder()
            .delete()
            .where('created_at >= CURRENT_DATE')
            .andWhere("created_at < CURRENT_DATE + INTERVAL '1 day'")
            .andWhere(`id NOT IN (${subQuery.getQuery()})`)
            .execute();
    }
}
