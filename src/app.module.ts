import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user';
import { PostModule } from './modules/post';



@Module({
  imports: [
    PrismaModule,
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
     PrismaService
    ],
})
export class AppModule {}
