import { DataSource } from 'typeorm';
import { PolicyComplianceVersionRepository } from '@root/pg/repository/version/policyComplianceVersion.repository';
import { PolicyVersionMap, PolicyVersionType } from '@root/nest/type/policy.type';
import { ValueNotFoundError } from '@root/pg/error/value.error';
import { ComplianceRepository, PolicyRepository, RequirementRepository } from '@root/pg/repository/policy';
export abstract class AbstractPolicyMigrate {
    private readonly policVersionRepository: PolicyComplianceVersionRepository;
    private readonly migrateVersion: PolicyVersionType;
    private isInit: boolean;
    private readonly tenantId: string;
    private readonly dataSource: DataSource;
    protected readonly complianceRepository: ComplianceRepository;
    protected readonly policyRepository: PolicyRepository;
    protected readonly requirementRepository: RequirementRepository;

    constructor(tenantId: string, dataSource: DataSource, migrateVersion: PolicyVersionType) {
        this.tenantId = tenantId;
        this.dataSource = dataSource;
        this.migrateVersion = migrateVersion;
        this.policVersionRepository = PolicyComplianceVersionRepository.createInstance({ tenantId: 'public' });
        this.complianceRepository = ComplianceRepository.createInstance({ dataSource });
        this.policyRepository = PolicyRepository.createInstance({ dataSource });
        this.requirementRepository = RequirementRepository.createInstance({ dataSource });
        this.isInit = false;
    }

    public async init() {
        if (this.isInit) {
            return;
        }
        await this.policVersionRepository.initialize();
        this.isInit = true;
    }

    protected async check(): Promise<boolean> {
        const version = await this.getPolicyVersion();
        return version < this.migrateVersion;
    }

    private async getPolicyVersion() {
        await this.init();
        try {
            const policyVersion = await this.policVersionRepository.findOne({ where: { schemaName: this.tenantId } });
            return policyVersion.version;
        } catch (e) {
            if (e instanceof ValueNotFoundError) {
                await this.create();
            }
            return PolicyVersionMap.none;
        }
    }

    private async create() {
        await this.policVersionRepository.create({ schemaName: this.tenantId, version: this.migrateVersion });
    }

    protected async postMigrate(): Promise<void> {
        await this.init();
        await this.policVersionRepository
            .getRepository()
            .update({ schemaName: this.tenantId }, { version: this.migrateVersion });
    }

    public abstract execute(): Promise<void>;
}
