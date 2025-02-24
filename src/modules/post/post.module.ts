import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostPrismaRepository } from './prisma-repositorys/post.prisma-repository';

// Controllers
import { CreatePostController } from './controllers/create-post.controller';
import { GetPostController } from './controllers/get-post.controller';
import { GetByIdPostController } from './controllers/getById-post.controller';
import { UpdatePostController } from './controllers/update-post.controller';
import { DeletePostController } from './controllers/delete-post.controller';

// Services
import { CreatePostService } from './services/create-post.service';
import { GetPostService } from './services/get-post.service';
import { GetByIdPostService } from './services/getById-post.service';
import { UpdatePostService } from './services/update-post.service';
import { DeletePostService } from './services/delete-post.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreatePostController,
    GetPostController,
    GetByIdPostController,
    UpdatePostController,
    DeletePostController,
  ],
  providers: [
    CreatePostService,
    GetPostService,
    GetByIdPostService,
    UpdatePostService,
    DeletePostService,

    // Repository Provider
    {
      provide: 'PostRepository',
      useClass: PostPrismaRepository,
    }
  ],
  exports: [
    {
      provide: 'PostRepository',
      useClass: PostPrismaRepository,
    }
  ],
})
export class PostModule {}
