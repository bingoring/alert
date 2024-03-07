import { PGDataSourceConnection } from './connection';
import { FakeDatabase } from './fakeDatabase.mock';
import { IBackup } from 'pg-mem';
import { DataSource } from 'typeorm';

export const getMockDataSourceAndBackup = async (): Promise<{ dataSource: DataSource; backup: IBackup }> => {
    const fakeDB = new FakeDatabase();
    const tenantId = PGDataSourceConnection.getInstance().DefaultTenantId;

    return {
        dataSource: await fakeDB.createDataSource(tenantId),
        backup: fakeDB.getMemorydb().backup(),
    };
};
