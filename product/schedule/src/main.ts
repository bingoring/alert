import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initService } from './init';
import { startNest } from '@root/nest/init';
import { AppModule } from './app.module';

async function bootstrap() {
    await initService();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: env.environment === 'production' ? false : undefined,
    });
    await startNest(app, env.scanner, serverName);
}

bootstrap();
