import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SellerPrismaRepository } from './prisma-repositorys/seller.prisma-repository';

// Controllers
import { CreateSellerController } from './controllers/create-seller.controller';
import { GetSellerController } from './controllers/get-seller.controller';
import { GetByIdSellerController } from './controllers/getById-seller.controller';
import { UpdateSellerController } from './controllers/update-seller.controller';
import { DeleteSellerController } from './controllers/delete-seller.controller';

// Services
import { CreateSellerService } from './services/create-seller.service';
import { GetSellerService } from './services/get-seller.service';
import { GetByIdSellerService } from './services/getById-seller.service';
import { UpdateSellerService } from './services/update-seller.service';
import { DeleteSellerService } from './services/delete-seller.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateSellerController,
    GetSellerController,
    GetByIdSellerController,
    UpdateSellerController,
    DeleteSellerController,
  ],
  providers: [
    CreateSellerService,
    GetSellerService,
    GetByIdSellerService,
    UpdateSellerService,
    DeleteSellerService,

    // Repository Provider
    {
      provide: 'SellerRepository',
      useClass: SellerPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'SellerRepository',
      useClass: SellerPrismaRepository,
    }
  ],
})
export class SellerModule {}
