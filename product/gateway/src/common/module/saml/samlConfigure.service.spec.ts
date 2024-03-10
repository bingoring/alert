import { Test, TestingModule } from '@nestjs/testing';
import { SamlConfigureService } from './samlConfigure.service';

describe('SAML Configure test', () => {
    let service: SamlConfigureService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SamlConfigureService],
        }).compile();
        service = await module.resolve<SamlConfigureService>(SamlConfigureService);
    });

    it('origin saml configuration test', () => {
        const origin = {
            ssoUrl: 'http://localhost:8081/simplesaml/saml2/idp/SSOService.php',
            entityId: 'saml-poc',
            certificate: 'asfjklasfjadfjklaaf',
        };

        const configure = service.getSamlConfiguration(origin);

        expect(configure.entryPoint).toEqual(origin.ssoUrl);
        expect(configure.issuer).toEqual(origin.entityId);
        expect(configure.cert).toEqual(origin.certificate);
        expect(configure.audience).toEqual(false);
        expect(configure.acceptedClockSkewMs).toEqual(100000);
    });

    it('ADFS saml configuration test', () => {
        const origin = {
            ssoUrl: 'http://localhost:8081/adfs/ls',
            entityId: 'saml-poc',
            certificate: 'asfjklasfjadfjklaaf',
        };

        const configure = service.getSamlConfiguration(origin);

        expect(configure.entryPoint).toEqual(origin.ssoUrl);
        expect(configure.issuer).toEqual(origin.entityId);
        expect(configure.cert).toEqual(origin.certificate);
        expect(configure.audience).toEqual(false);
        expect(configure.acceptedClockSkewMs).toEqual(100000);
        expect(configure.authnContext?.[0]).toEqual(
            'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows'
        );
        expect(configure.wantAuthnResponseSigned).toEqual(false);
        expect(configure.identifierFormat).toEqual(null);
    });
});
