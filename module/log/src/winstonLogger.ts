import winston from 'winston';
import { AbstractLogger } from './logger';

export class Logger extends AbstractLogger {
    private readonly loggerCore: winston.Logger;
    private static instance: AbstractLogger;
    private constructor(loggerCore: winston.Logger) {
        super();
        this.loggerCore = loggerCore;
    }

    public override debug(...msg: any[]): void {
        this.loggerCore.debug(msg);
    }
    public override info(...msg: any[]): void {
        this.loggerCore.info(msg);
    }
    public override error(...msg: any[]): void {
        this.loggerCore.error(msg);
    }

    public static getInstance(loggerCore: winston.Logger) {
        if (this.instance === undefined) {
            this.instance = new this(loggerCore);
        }

        return this.instance;
    }
}
