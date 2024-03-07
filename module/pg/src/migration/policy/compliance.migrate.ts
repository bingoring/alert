import { AbstractPolicyMigrate } from './abstractPolicy.migrate';
import { ComplianceList } from '@root/pg/constant/policy/compliance/main';

export class ComplianceMigrate extends AbstractPolicyMigrate {
    public async execute() {
        await this.complianceRepository.getRepository().save(ComplianceList);
    }
}
