import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceOrderProductPrismaRepository } from './prisma-repositorys/service-order-product.prisma-repository';

// Controllers
import { CreateServiceOrderProductController } from './controllers/create-service-order-product.controller';
import { GetServiceOrderProductController } from './controllers/get-service-order-product.controller';
import { GetByIdServiceOrderProductController } from './controllers/getById-service-order-product.controller';
import { UpdateServiceOrderProductController } from './controllers/update-service-order-product.controller';
import { DeleteServiceOrderProductController } from './controllers/delete-service-order-product.controller';

// Services
import { CreateServiceOrderProductService } from './services/create-service-order-product.service';
import { GetServiceOrderProductService } from './services/get-service-order-product.service';
import { GetByIdServiceOrderProductService } from './services/getById-service-order-product.service';
import { UpdateServiceOrderProductService } from './services/update-service-order-product.service';
import { DeleteServiceOrderProductService } from './services/delete-service-order-product.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateServiceOrderProductController,
    GetServiceOrderProductController,
    GetByIdServiceOrderProductController,
    UpdateServiceOrderProductController,
    DeleteServiceOrderProductController,
  ],
  providers: [
    CreateServiceOrderProductService,
    GetServiceOrderProductService,
    GetByIdServiceOrderProductService,
    UpdateServiceOrderProductService,
    DeleteServiceOrderProductService,

    // Repository Provider
    {
      provide: 'ServiceOrderProductRepository',
      useClass: ServiceOrderProductPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'ServiceOrderProductRepository',
      useClass: ServiceOrderProductPrismaRepository,
    }
  ],
})
export class ServiceOrderProductModule {}
