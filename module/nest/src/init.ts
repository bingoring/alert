import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { GlobalExceptionsFilter } from './filter/global.filter';
import { GlobalValidationPipe } from './pipe/validation.pipe';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { ServerInfoType } from '../../common/src/type/config.type';
import { loggerMiddleware } from './middleware/logging.middleware';
import { ServerNameMap } from '../../common/src/type/server.type';

export async function startNest(app: NestExpressApplication, option: ServerInfoType, serverName: string) {
    app.disable('x-powered-by');
    app.useGlobalPipes(new GlobalValidationPipe());
    app.use(loggerMiddleware);
    if (serverName !== ServerNameMap.gateway) {
        app.useGlobalFilters(new GlobalExceptionsFilter());
    }
    app.use(json({ limit: 1000 * 1000 * 1000 }));
    app.use(compression());
    app.use(cookieParser());

    await app.listen(option.port);
    log.info(`${serverName} is running on: ${option.url}`);
}
