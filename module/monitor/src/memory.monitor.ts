import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';
import { EventNameMap } from './constant/event.constant';
import { AbstractMonitorService } from './abstract.monitor';

@Injectable()
export class MemoryMonitorService extends AbstractMonitorService {
    constructor() {
        super(EventNameMap.memoryThreshold);
    }

    protected async setThreshold() {
        try {
            const data = await si.mem();
            const totalMemory = data.total / 1024; // 단위를 KB에서 MB로 변환
            this.threshold = totalMemory * 0.8; // 총 메모리의 80%
        } catch (error) {
            log.error(`Error while setting memory threshold: ${error}`);
        }
    }

    protected async getMonitorData() {
        const data = await si.mem();
        const currentMemory = data.used / 1024; // 단위를 KB에서 MB로 변환
        return currentMemory;
    }

    public subscribeToMemoryEvent(callback: () => Promise<void> | void) {
        this.eventEmitter.on(EventNameMap.memoryThreshold, callback);
    }
}
