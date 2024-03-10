import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SamlStrategy } from './saml.strategy';
import { LoginUserService } from '@root/gateway/router/login/user/user.service';
import { LoginSamlService } from '@root/gateway/router/login/saml/saml.service';
import { OrganizationService } from '@root/gateway/router/organization/organization.service';
import { SamlConfigureService } from './samlConfigure.service';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'saml' })],
    providers: [SamlStrategy, LoginSamlService, LoginUserService, OrganizationService, SamlConfigureService],
})
export class SamlAuthModule {}
