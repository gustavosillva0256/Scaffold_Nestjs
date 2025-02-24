import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany(
      {
        include: {
          posts: true,
        },
      }
    );
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.user.count({ where: { id } });
    return count > 0;
  }
}