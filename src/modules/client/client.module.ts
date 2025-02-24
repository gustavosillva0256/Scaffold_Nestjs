import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientPrismaRepository } from './prisma-repositorys/client.prisma-repository';

// Controllers
import { CreateClientController } from './controllers/create-client.controller';
import { GetClientController } from './controllers/get-client.controller';
import { GetByIdClientController } from './controllers/getById-client.controller';
import { UpdateClientController } from './controllers/update-client.controller';
import { DeleteClientController } from './controllers/delete-client.controller';

// Services
import { CreateClientService } from './services/create-client.service';
import { GetClientService } from './services/get-client.service';
import { GetByIdClientService } from './services/getById-client.service';
import { UpdateClientService } from './services/update-client.service';
import { DeleteClientService } from './services/delete-client.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateClientController,
    GetClientController,
    GetByIdClientController,
    UpdateClientController,
    DeleteClientController,
  ],
  providers: [
    CreateClientService,
    GetClientService,
    GetByIdClientService,
    UpdateClientService,
    DeleteClientService,

    // Repository Provider
    {
      provide: 'ClientRepository',
      useClass: ClientPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'ClientRepository',
      useClass: ClientPrismaRepository,
    }
  ],
})
export class ClientModule {}
