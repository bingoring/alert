import { AbstractPolicyMigrate } from './abstractPolicy.migrate';
import { PolicyList } from '@root/pg/constant/policy/policy/main';

export class PolicyMigration extends AbstractPolicyMigrate {
    public async execute() {
        for (const policy of PolicyList) {
            await this.policyRepository.getRepository().save(policy);
        }
    }
}
