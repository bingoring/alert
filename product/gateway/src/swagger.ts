import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class APIDocumentBuilder {
    private readonly app: INestApplication;
    constructor(app: INestApplication) {
        this.app = app;
    }

    private createDocument() {
        const builder = new DocumentBuilder();
        const options = builder
            .setTitle('Tatum API Document')
            .setDescription('Tatum 3.0 API Document.')
            .setVersion('3.0.0')
            .addBearerAuth()
            .build();

        return SwaggerModule.createDocument(this.app, options);
    }

    public applyDocument(path: string) {
        const document = this.createDocument();
        SwaggerModule.setup(path, this.app, document, {
            swaggerOptions: {
                defaultModelsExpandDepth: -1,
            },
            // customfavIcon: 'https://tatumsecurity.com/favicon/favicon_64x64.png',
            // customCss: `.topbar-wrapper img {content:url(\'https://camo.githubusercontent.com/ac15a07bee71a902a7d112eca681ee86395465ca7695e59606eafbdf1b80060c/68747470733a2f2f746174756d73656375726974792e636f6d2f746174756d4c6f676f48616e647365742e706e67\'); }`,
        });
    }

    public static createInstance(app: INestApplication) {
        return new APIDocumentBuilder(app);
    }
}
