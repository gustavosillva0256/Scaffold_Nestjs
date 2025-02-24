import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class PostPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany(
      {
        include: {
          author: true,
        },
      }
    );
  }

  async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: { id },
    include: {
        author: true,
      },
    });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    return this.prisma.post.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.post.count({ where: { id } });
    return count > 0;
  }
}