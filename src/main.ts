import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception/notFoundException';

declare const module: any;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Api en Node.Js con Nestjs')
    .setDescription('El api es de prueba e ira escalando según requerimientos de proyecto personal')
    .setContact(
      'Cristian Arnulfo Murcia Guzmán',
      'https://www.linkedin.com/in/cristian-arnulfo-murcia-guzman/',
      'djcrissguzman@gmail.com'
    )
    .setVersion('1.0')
    .addBearerAuth(
    /*{
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
      name: 'jwt',
      description: 'Por favor inserte su token jwt',
    },
    'JWT-auth',*/
  )
    .build();
  const document = SwaggerModule.createDocument(app, { ...config }, { ignoreGlobalPrefix: true, });
  SwaggerModule.setup('api/swagger', app, document);


  await app.listen(3000).then(() => console.log("Corriendo servicio rest"));

  // eslint-disable-next-line prettier/prettier
  /*if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }*/
}

bootstrap();
