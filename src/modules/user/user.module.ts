import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

// Serviços
import { CreateUserService } from './services/create-user.service';
import { GetUserService } from './services/get-user.service';
import { GetByIdUserService } from './services/get-by-id-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

// Controllers
import { CreateUserController } from './controllers/create-user.controller';
import { GetUserController } from './controllers/get-user.controller';
import { GetByIdUserController } from './controllers/get-by-id-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';

// Repository
import { UserPrismaRepository } from './prisma-repositorys/user.prisma.repository';

// Mapper
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    PrismaModule,
  ],
  controllers: [
    CreateUserController,
    GetUserController,
    GetByIdUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [
    CreateUserService,
    GetUserService,
    GetByIdUserService,
    UpdateUserService,
    DeleteUserService,
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    UserMapper,
  ],
  exports: [
    CreateUserService,
    GetUserService,
    GetByIdUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
