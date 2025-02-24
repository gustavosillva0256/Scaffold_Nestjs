import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './modules/client';
import { AddressModule } from './modules/address';

@Module({
  imports: [
    PrismaModule,
    ClientModule,
    AddressModule
  ],
  controllers: [],
  providers: [
    AppService,
     PrismaService
    ],
})
export class AppModule {}
