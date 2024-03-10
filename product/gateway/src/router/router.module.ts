import { Module } from '@nestjs/common';
import { SignUpModule } from './sign-up/sign-up.module';
import { LoginModule } from './login/login.module';
import { AlarmModule } from './alarm/alarm.module';

@Module({
    imports: [LoginModule, SignUpModule, AlarmModule],
})
export class RouterModule {}
