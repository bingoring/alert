import { OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class AbstractMonitorService implements OnModuleInit {
    protected readonly eventEmitter: EventEmitter2;
    protected threshold!: number;

    constructor(private readonly eventName: string) {
        this.eventEmitter = new EventEmitter2();
    }

    public subscribeToEvent(callback: () => Promise<void> | void): void {
        this.eventEmitter.on(this.eventName, callback);
    }

    public async onModuleInit() {
        await this.setThreshold();
        this.monitor();
    }

    protected createEvent(target: string) {
        log.debug(`${target} threshold exceeded! Creating event....`);
        this.eventEmitter.emit(this.eventName);
    }

    public async monitor() {
        try {
            const currentData = await this.getMonitorData();

            log.debug(`Current usage: ${currentData} MB`);

            if (currentData > this.threshold) {
                this.createEvent('Memory');
            }
        } catch (error) {
            log.error(`Error while monitoring memory: ${error}`);
        } finally {
            setTimeout(() => this.monitor(), 5 * 1000);
        }
    }

    protected abstract getMonitorData(): Promise<number>;
    protected abstract setThreshold(): Promise<void>;
}
