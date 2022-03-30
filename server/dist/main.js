"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/exception/http-exception.filter");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const expressBasicAuth = require("express-basic-auth");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const MODE = process.env.NODE_ENV === 'development' ? true : false;
    console.log('NODE_ENV >> ', process.env.NODE_ENV);
    const keyFile = fs.readFileSync(path.join(__dirname + '/certificate/localhost-key.pem'));
    const certFile = fs.readFileSync(path.join(__dirname + '/certificate/localhost.pem'));
    const httpsOptions = {
        key: keyFile,
        cert: certFile,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
    });
    app.enableCors({
        origin: [
            'http://log1999.com',
            'https://log1999.com',
            'http://localhost:3000',
            'https://localhost:3000',
        ],
        credentials: true,
    });
    const PORT = process.env.PORT || 8000;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lightning Market Clone')
        .setDescription('Lightning Market Clone API description')
        .setVersion('1.0')
        .addTag('default')
        .build();
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(['/docs', '/docs-json'], expressBasicAuth({
        challenge: true,
        users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
    }));
    app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
        prefix: '/static',
    });
    app.use(cookieParser());
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map