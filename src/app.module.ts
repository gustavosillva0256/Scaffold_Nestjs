import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './modules/client';
import { AddressModule } from './modules/address';
import { ProductModule } from './modules/product';
import { SellerModule } from './modules/seller';
import { ServiceOrderModule } from './modules/service-order';
import { ServiceOrderProductModule } from './modules/service-order-product';
import { SupplierModule } from './modules/supplier';

@Module({
  imports: [
    PrismaModule,
    ClientModule,
    AddressModule,
    ProductModule,
    SellerModule,
    ServiceOrderModule,
    ServiceOrderProductModule,
    SupplierModule
  ],
  controllers: [],
  providers: [
    AppService,
     PrismaService
    ],
})
export class AppModule {}
