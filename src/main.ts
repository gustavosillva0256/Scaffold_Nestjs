import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentação da API gerada automaticamente')
    .setVersion('1.0')
    .addBearerAuth() // Caso tenha autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 API rodando em: http://localhost:3000/api/docs`);
}
bootstrap();
