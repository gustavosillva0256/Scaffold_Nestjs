import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPrismaRepository } from './prisma-repositorys/user.prisma-repository';

// Controllers
import { CreateUserController } from './controllers/create-user.controller';
import { GetUserController } from './controllers/get-user.controller';
import { GetByIdUserController } from './controllers/getById-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';

// Services
import { CreateUserService } from './services/create-user.service';
import { GetUserService } from './services/get-user.service';
import { GetByIdUserService } from './services/getById-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

@Module({
  imports: [PrismaModule],
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

    // Repository Provider
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    }
  ],
})
export class UserModule {}
