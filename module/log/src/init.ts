import { Logger } from './winstonLogger';
import { LogLevelType } from './type';
import winston from 'winston';
import { winstonOptions } from './config';

export function initLogger(serverName: string, logLevel: LogLevelType) {
    globalThis.log = Logger.getInstance(winston.createLogger(winstonOptions(serverName, logLevel)));
}

export function bootstrapLogger(serverName: string) {
    globalThis.log = Logger.getInstance(winston.createLogger(winstonOptions(serverName, 'debug')));
}
