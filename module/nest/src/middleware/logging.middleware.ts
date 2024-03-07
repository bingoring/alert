import { getDataObject, getIpAddr } from '@root/common/util/etc';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.path.slice(-13) === '/health-check') {
        return next();
    }

    const url = req.originalUrl.split('?')[0];

    const uniq = v4();
    const userAgent = req.headers['user-agent'];
    const ipAddr = getIpAddr(req);
    const dataObject = getDataObject(req);

    log.info(`[REQ] [${uniq}] ${ipAddr} | "${req.method} ${url}" ${dataObject} | ${userAgent}`);

    const startTime = new Date().getTime();

    res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        const statusCode = res?.statusCode ?? 500;
        log.info(`[RES] [${uniq}] ${ipAddr} | "${req.method} ${statusCode} ${url}" | ${userAgent} ${responseTime}ms`);
    });

    next();
}
