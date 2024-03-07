import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SamlStrategy } from './saml.strategy';
import { LoginUserService } from '@backend-x/gateway/router/login/user/user.service';
import { LoginSamlService } from '@backend-x/gateway/router/login/saml/saml.service';
import { OrganizationService } from '@backend-x/gateway/router/organization/organization.service';
import { SamlConfigureService } from './samlConfigure.service';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'saml' })],
    providers: [SamlStrategy, LoginSamlService, LoginUserService, OrganizationService, SamlConfigureService],
})
export class SamlAuthModule {}
