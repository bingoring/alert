import winston from 'winston';
import { LogLevelType } from '../type';
import Transport from 'winston-transport';
import util from 'util';
import { getTime } from '@root/common/util';

export const winstonOptions = (serverName: string, logLevel: LogLevelType, ...transports: Transport[]) => {
    return {
        level: logLevel,
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    {
                        transform: (info) => {
                            const argList = [...info.message, ...(info[Symbol.for('splat')] || [])];
                            info.message = argList;

                            const msg = argList
                                .map((arg) => {
                                    if (typeof arg === 'object')
                                        return util.inspect(arg, { compact: true, depth: Infinity });
                                    return arg;
                                })
                                .join(' ');

                            info[Symbol.for('message')] = `[${serverName}] ${info[
                                Symbol.for('level')
                            ].toUpperCase()}: [${getTime()}] ${msg}${info['stack'] ? ' ' + info['stack'] : ''}`;

                            return info;
                        },
                    },
                    winston.format.colorize({ all: true })
                ),
            }),
            ...transports,
        ],
    };
};
