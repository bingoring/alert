import { startNest } from '@root/nest/init';
import { PGDataSourceConnection } from '@root/pg/connection/connection';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import { AppModule } from './app.module';
import { CustomErrorExceptionFilter } from './common/filter/customError.filter';
import { ErrorExceptionFilter } from './common/filter/error.filter';
import { initService } from './init';
import { APIDocumentBuilder } from './swagger';
import { PGSessionStore } from './util/pgSessionStore';

async function bootstrap() {
    await initService();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: env.environment === 'production' ? false : undefined,
    });

    const globalPrefix = '/';
    app.setGlobalPrefix(globalPrefix);

    const pgDataSourceConn = PGDataSourceConnection.getInstance();
    const pgStore = new PGSessionStore(await pgDataSourceConn.getDataSource(pgDataSourceConn.DefaultTenantId));
    await pgStore.initStoreSetting();

    app.use(
        session({
            secret: 'Alarm',
            resave: true,
            rolling: true,
            saveUninitialized: false,
            store: pgStore,
        })
    );

    app.useGlobalFilters(new CustomErrorExceptionFilter(), new ErrorExceptionFilter());

    APIDocumentBuilder.createInstance(app).applyDocument(`${globalPrefix}/docs`);
    await startNest(app, env.gateway, serverName);
}

bootstrap();
