import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupplierPrismaRepository } from './prisma-repositorys/supplier.prisma-repository';

// Controllers
import { CreateSupplierController } from './controllers/create-supplier.controller';
import { GetSupplierController } from './controllers/get-supplier.controller';
import { GetByIdSupplierController } from './controllers/getById-supplier.controller';
import { UpdateSupplierController } from './controllers/update-supplier.controller';
import { DeleteSupplierController } from './controllers/delete-supplier.controller';

// Services
import { CreateSupplierService } from './services/create-supplier.service';
import { GetSupplierService } from './services/get-supplier.service';
import { GetByIdSupplierService } from './services/getById-supplier.service';
import { UpdateSupplierService } from './services/update-supplier.service';
import { DeleteSupplierService } from './services/delete-supplier.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateSupplierController,
    GetSupplierController,
    GetByIdSupplierController,
    UpdateSupplierController,
    DeleteSupplierController,
  ],
  providers: [
    CreateSupplierService,
    GetSupplierService,
    GetByIdSupplierService,
    UpdateSupplierService,
    DeleteSupplierService,

    // Repository Provider
    {
      provide: 'SupplierRepository',
      useClass: SupplierPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'SupplierRepository',
      useClass: SupplierPrismaRepository,
    }
  ],
})
export class SupplierModule {}
