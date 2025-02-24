import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressPrismaRepository } from './prisma-repositorys/address.prisma-repository';

// Controllers
import { CreateAddressController } from './controllers/create-address.controller';
import { GetAddressController } from './controllers/get-address.controller';
import { GetByIdAddressController } from './controllers/getById-address.controller';
import { UpdateAddressController } from './controllers/update-address.controller';
import { DeleteAddressController } from './controllers/delete-address.controller';

// Services
import { CreateAddressService } from './services/create-address.service';
import { GetAddressService } from './services/get-address.service';
import { GetByIdAddressService } from './services/getById-address.service';
import { UpdateAddressService } from './services/update-address.service';
import { DeleteAddressService } from './services/delete-address.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateAddressController,
    GetAddressController,
    GetByIdAddressController,
    UpdateAddressController,
    DeleteAddressController,
  ],
  providers: [
    CreateAddressService,
    GetAddressService,
    GetByIdAddressService,
    UpdateAddressService,
    DeleteAddressService,

    // Repository Provider
    {
      provide: 'AddressRepository',
      useClass: AddressPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'AddressRepository',
      useClass: AddressPrismaRepository,
    }
  ],
})
export class AddressModule {}
