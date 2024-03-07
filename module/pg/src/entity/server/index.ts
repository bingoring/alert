import { ScheduleTaskEntity } from './scheduleTask.entity';
import { ServerStatusEntity } from './serverStatus.entity';

export const ServerStatusEntityList = [ServerStatusEntity, ScheduleTaskEntity] as const;
