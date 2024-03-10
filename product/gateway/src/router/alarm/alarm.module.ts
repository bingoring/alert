import { Module } from '@nestjs/common';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { DataSource, SessionModule } from 'product/gateway/src/common/module/session.module';
import { AlarmRepository } from '@root/pg/repository/alarm';
import { ConnectionToken } from '@root/nest/module/tenant.module';

@Module({
    imports: [SessionModule],
    controllers: [AlarmController],
    providers: [
        AlarmService,
        {
            provide: 'AlarmRepository',
            useFactory: (dataSource: DataSource) => new AlarmRepository({ dataSource }),
            inject: [ConnectionToken],
        },
    ],
})
export class AlarmModule {}
