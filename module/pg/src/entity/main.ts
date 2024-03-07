import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { UserEntityList } from './user';
import { ServerStatusEntityList } from './server';
import { SettingEntityList } from './setting';
import { LogEntityList } from './log';
import { PipelineEntityList } from './pipeline';

export const EntityList = [
    ...UserEntityList,
    ...PipelineEntityList,
    ...ServerStatusEntityList,
    ...SettingEntityList,
    ...LogEntityList,
] as BaseDataSourceOptions['entities'];
