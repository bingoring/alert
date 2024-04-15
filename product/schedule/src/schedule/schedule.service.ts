import { Injectable } from '@nestjs/common';
import { PGDataSourceConnection } from '@root/pg/connection/connection';
import { DataSource } from 'typeorm';
import { AbstractDataLoadStrategy } from './strategy/dataLoad.strategy';

@Injectable()
export class ScheduleService {
    public async loadStatData(dataLoadStrategy: AbstractDataLoadStrategy): Promise<void> {
        await this.wrapWithErrorHandler(async () => {
            const dataSource = await this.getDataSource('public');
            await dataLoadStrategy.exec(dataSource);
        });
    }

    private async getDataSource(tenantId: string): Promise<DataSource> {
        return PGDataSourceConnection.getInstance().getDataSource(tenantId);
    }

    private async wrapWithErrorHandler(callback: () => Promise<void>): Promise<void> {
        try {
            await callback();
        } catch (e) {
            log.error(e);
        }
    }
}
