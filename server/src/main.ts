import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const MODE: boolean = process.env.NODE_ENV === 'development' ? true : false;

  const keyFile = fs.readFileSync(
    path.join(__dirname + '/certificate/localhost-key.pem'),
  );
  const certFile = fs.readFileSync(
    path.join(__dirname + '/certificate/localhost.pem'),
  );
  console.log('keyFile >> ', keyFile);
  console.log('certFile >> ', certFile);

  const httpsOptions = {
    key: keyFile,
    cert: certFile,
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  // origin은 배포시 특정 URL을 사용하길 권장함
  app.enableCors({
    origin: 'https://localhost:3000',
    credentials: true,
  });
  const PORT = process.env.PORT || 8000;
  const config = new DocumentBuilder()
    .setTitle('Lightning Market Clone')
    .setDescription('Lightning Market Clone API description')
    .setVersion('1.0')
    .addTag('default')
    .build();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // http:localhost:8000/static/user/ad_391321.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/static',
  });

  // 쿠키를 다루기 쉽게해줌
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}

bootstrap();
