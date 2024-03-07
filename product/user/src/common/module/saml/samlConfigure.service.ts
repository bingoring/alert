import { SamlConfigureDto } from '@backend-x/gateway/router/loginIntegration/saml/saml.type';
import { Injectable } from '@nestjs/common';
import { SamlConfig } from '@node-saml/passport-saml';

@Injectable()
export class SamlConfigureService {
    public getSamlConfiguration(configuration: SamlConfigureDto): SamlConfig {
        if (configuration.ssoUrl.includes('/adfs/ls')) {
            return this.getAdfsConfiguration(configuration);
        }

        return this.getOriginSamlConfiguration(configuration);
    }

    private getOriginSamlConfiguration(configuration: SamlConfigureDto): SamlConfig {
        return {
            entryPoint: configuration.ssoUrl,
            issuer: configuration.entityId,
            cert: configuration.certificate,
            acceptedClockSkewMs: 100000,
            audience: false,
        };
    }

    private getAdfsConfiguration(configuration: SamlConfigureDto): SamlConfig {
        return {
            entryPoint: configuration.ssoUrl,
            issuer: configuration.entityId,
            cert: configuration.certificate,
            authnContext: ['http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows'],
            wantAuthnResponseSigned: false,
            identifierFormat: null,
            acceptedClockSkewMs: 100000,
            audience: false,
        };
    }
}
