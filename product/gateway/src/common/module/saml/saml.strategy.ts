import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { MultiSamlStrategy, MultiStrategyConfig, Profile } from '@node-saml/passport-saml';
import { LoginSamlService } from '../../../router/login/saml/saml.service';
import { Request } from 'express';
import { LoginUserService } from '../../../router/login/user/user.service';
import { StrategyOptionsCallback } from '@node-saml/passport-saml/lib/types';
import { OrganizationService } from '@root/gateway/router/organization/organization.service';
import { Minute } from '@root/gateway/constant/time.constant';
import { SamlProfileType } from '@root/gateway/router/login/saml/saml.type';
import { SamlConfigureService } from './samlConfigure.service';

@Injectable()
export class SamlStrategy extends PassportStrategy(MultiSamlStrategy, 'saml') {
    constructor(
        private readonly loginSamlService: LoginSamlService,
        private readonly loginUserService: LoginUserService,
        private readonly organizationService: OrganizationService,
        private readonly samlConfigureService: SamlConfigureService
    ) {
        super(
            {
                name: 'saml',
                passReqToCallback: true,
                getSamlOptions: async (req: Request, cb: StrategyOptionsCallback) => {
                    const userId = await this.getUserId(req);

                    const result = await loginSamlService.getLoginInfo({ userId });
                    const configuration = result.value?.configuration;

                    if (configuration === undefined) {
                        return cb(new Error('No such saml config'));
                    }

                    cb(null, this.samlConfigureService.getSamlConfiguration(configuration));
                },
            } as MultiStrategyConfig,
            (req: Request, profile: Profile | null, done: (...args: any[]) => void) => {
                if (profile === null) {
                    throw new Error('no such user data.');
                }

                if (profile.nameID === undefined && profile.attribute !== undefined) {
                    // ADFS
                    const adfsNameId = Object.values(profile.attribute ?? {})[0] as string;
                    profile.nameID = adfsNameId;
                    profile.email = adfsNameId;
                }

                return done(null, profile);
            }
        );
    }

    public validate(req: Request, profile: Profile) {
        const organizationId = this.getOrganizationId(req);
        return {
            ...profile,
            organizationId,
        } as SamlProfileType;
    }

    private async getUserId(req: Request) {
        const userId = req.query.userId as string;

        if (userId !== undefined) {
            return await this.getUserIdFromLogin(userId);
        }

        return await this.getUserIdFromCallback(req);
    }

    private async getUserIdFromLogin(userId: string) {
        const organization = await this.organizationService.getOrganization(userId);
        await redis.setex(`/saml/temp/${organization.value.id}`, 5 * Minute, userId);
        return userId;
    }

    private async getUserIdFromCallback(req: Request) {
        const organizationId = this.getOrganizationId(req);
        const userId = await redis.get(`/saml/temp/${organizationId}`);

        if (userId === null) {
            throw new Error('no such user');
        }

        return userId;
    }

    private getOrganizationId(req: Request) {
        const [organizationId] = req.url.split('/').slice(-2, -1);
        return organizationId;
    }
}
