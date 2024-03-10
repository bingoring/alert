import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { DataSource, SessionModule } from 'product/gateway/src/common/module/session.module';
import { UserRepository } from '@root/pg/repository/user';
import { ConnectionToken } from '@root/nest/module/tenant.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './login.serializer';

@Module({
    imports: [PassportModule.register({ session: true }), SessionModule],
    controllers: [LoginController],
    providers: [
        LoginService,
        LocalStrategy,
        LocalSerializer,
        {
            provide: 'UserRepository',
            useFactory: (dataSource: DataSource) => new UserRepository({ dataSource }),
            inject: [ConnectionToken],
        },
    ],
})
export class LoginModule {}
