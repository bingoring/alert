import { GroupEntity } from './group.entity';
import { OrganizationSchemaEntity } from './organizationSchema.entity';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';
import { UserSchemaEntity } from './userSchema.entity';

export const UserEntityList = [
    UserEntity,
    ProjectEntity,
    GroupEntity,
    UserSchemaEntity,
    OrganizationSchemaEntity,
] as const;
