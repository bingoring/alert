import { ComplianceMigrate } from './compliance.migrate';
import { RequirementMigrate } from './requirement.migrate';
import { PolicyMigration } from './policy.migrate';

export const PolicyMigrateList = [PolicyMigration, ComplianceMigrate, RequirementMigrate];
