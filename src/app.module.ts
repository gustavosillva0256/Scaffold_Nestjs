import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

    // Modulos
    // Controladores
    // Servicos
    // Repositorios
    // DTOs
    // Entidades
    // Configuracoes
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 