import { DataType, IMemoryDb, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';
import { EntityList } from '../entity/main';
import { getTime } from '@root/common/util';

export class FakeDatabase {
    private readonly memorydb: IMemoryDb;
    private readonly defaultTenant = 'public';
    private static instance: FakeDatabase;

    constructor() {
        const memorydb = newDb({
            autoCreateForeignKeyIndices: true,
        });

        memorydb.public.registerFunction({
            implementation: () => 'database',
            returns: DataType.text,
            name: 'current_database',
        });

        memorydb.public.registerFunction({
            name: 'version',
            args: [],
            returns: DataType.text,
            implementation: (x) => `hello world: ${x}`,
        });

        memorydb.public.registerFunction({
            name: 'date',
            args: [DataType.timestamptz],
            returns: DataType.date,
            implementation: (x) => {
                return getTime({ time: new Date(x), format: 'YYYY-MM-DD' });
            },
        });

        memorydb.registerExtension('uuid-ossp', (schema) => {
            schema.registerFunction({
                name: 'uuid_generate_v4',
                returns: DataType.uuid,
                implementation: v4,
                impure: true,
            });
        });
        this.memorydb = memorydb;
    }

    public getMemorydb() {
        return this.memorydb;
    }

    public async createDataSource(schema: string, entityList = EntityList) {
        if (schema !== this.defaultTenant) {
            this.memorydb.createSchema(schema);
        }

        const dataSource: DataSource = await this.memorydb.adapters.createTypeormDataSource({
            type: 'postgres',
            database: 'database',
            schema,
            entities: entityList,
            synchronize: true,
        });
        await dataSource.initialize();
        return dataSource;
    }

    public static createInstance() {
        if (this.instance === undefined) {
            this.instance = new FakeDatabase();
        }

        return this.instance;
    }
}
