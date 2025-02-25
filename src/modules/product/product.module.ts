import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductPrismaRepository } from './prisma-repositorys/product.prisma-repository';

// Controllers
import { CreateProductController } from './controllers/create-product.controller';
import { GetProductController } from './controllers/get-product.controller';
import { GetByIdProductController } from './controllers/getById-product.controller';
import { UpdateProductController } from './controllers/update-product.controller';
import { DeleteProductController } from './controllers/delete-product.controller';

// Services
import { CreateProductService } from './services/create-product.service';
import { GetProductService } from './services/get-product.service';
import { GetByIdProductService } from './services/getById-product.service';
import { UpdateProductService } from './services/update-product.service';
import { DeleteProductService } from './services/delete-product.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateProductController,
    GetProductController,
    GetByIdProductController,
    UpdateProductController,
    DeleteProductController,
  ],
  providers: [
    CreateProductService,
    GetProductService,
    GetByIdProductService,
    UpdateProductService,
    DeleteProductService,

    // Repository Provider
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    }
  ],
})
export class ProductModule {}
