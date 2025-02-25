import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceOrderPrismaRepository } from './prisma-repositorys/service-order.prisma-repository';

// Controllers
import { CreateServiceOrderController } from './controllers/create-service-order.controller';
import { GetServiceOrderController } from './controllers/get-service-order.controller';
import { GetByIdServiceOrderController } from './controllers/getById-service-order.controller';
import { UpdateServiceOrderController } from './controllers/update-service-order.controller';
import { DeleteServiceOrderController } from './controllers/delete-service-order.controller';

// Services
import { CreateServiceOrderService } from './services/create-service-order.service';
import { GetServiceOrderService } from './services/get-service-order.service';
import { GetByIdServiceOrderService } from './services/getById-service-order.service';
import { UpdateServiceOrderService } from './services/update-service-order.service';
import { DeleteServiceOrderService } from './services/delete-service-order.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateServiceOrderController,
    GetServiceOrderController,
    GetByIdServiceOrderController,
    UpdateServiceOrderController,
    DeleteServiceOrderController,
  ],
  providers: [
    CreateServiceOrderService,
    GetServiceOrderService,
    GetByIdServiceOrderService,
    UpdateServiceOrderService,
    DeleteServiceOrderService,

    // Repository Provider
    {
      provide: 'ServiceOrderRepository',
      useClass: ServiceOrderPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'ServiceOrderRepository',
      useClass: ServiceOrderPrismaRepository,
    }
  ],
})
export class ServiceOrderModule {}
