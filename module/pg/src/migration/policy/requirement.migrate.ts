import { RequirementEntity } from '@root/pg/entity/policy/requirement.entity';
import { DeepPartial } from 'typeorm';
import { AbstractPolicyMigrate } from './abstractPolicy.migrate';
import { PolicyComplianceRequirementList } from '@root/pg/constant/policy/main';

export class RequirementMigrate extends AbstractPolicyMigrate {
    public async execute() {
        for (const { complianceAccList, policyAccList, requirementList } of PolicyComplianceRequirementList) {
            const requirementEntityList: DeepPartial<RequirementEntity>[] = [];
            for (const acc of complianceAccList) {
                const requirement = requirementList.find((v) => v.requirementId === acc.requirementId);
                if (requirement === undefined) {
                    continue;
                }
                requirementEntityList.push({
                    complianceList: [{ complianceId: acc.complianceId }],
                    requirementId: acc.requirementId,
                    requirement: requirement?.requirement ?? 'Control',
                    category: requirement?.category ?? '',
                    policyList: policyAccList
                        .filter((v) => v.requirementId === acc.requirementId)
                        .map((v) => ({
                            policyId: v.policyId,
                        })),
                });
            }

            const existRequirementList = await this.requirementRepository.getRepository().find();

            for (const requirement of requirementEntityList) {
                if (existRequirementList.find((v) => v.requirementId === requirement.requirementId) !== undefined) {
                    continue;
                }
                try {
                    await this.requirementRepository.create(requirement);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}
