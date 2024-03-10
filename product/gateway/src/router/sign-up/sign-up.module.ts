import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { DataSource, SessionModule } from 'product/gateway/src/common/module/session.module';
import { UserRepository } from '@root/pg/repository/user';
import { ConnectionToken } from '@root/nest/module/tenant.module';

@Module({
    imports: [SessionModule],
    controllers: [SignUpController],
    providers: [
        SignUpService,
        {
            provide: 'UserRepository',
            useFactory: (dataSource: DataSource) => new UserRepository({ dataSource }),
            inject: [ConnectionToken],
        },
    ],
})
export class SignUpModule {}
