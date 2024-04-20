// memory-monitor.service.ts
import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';
import { EventNameMap } from './constant/event.constant';
import { AbstractMonitorService } from './abstract.monitor';

@Injectable()
export class CpuMonitorService extends AbstractMonitorService {
    constructor() {
        super(EventNameMap.cpuThreshold);
    }

    protected async setThreshold() {
        this.threshold = 80;
    }

    protected async getMonitorData() {
        const data = await si.currentLoad();
        const currentMemory = data.currentLoad; // 단위를 KB에서 MB로 변환
        return currentMemory;
    }
}
