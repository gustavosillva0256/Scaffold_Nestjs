import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Seller } from '@prisma/client';

@Injectable()
export class SellerPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SellerCreateInput): Promise<Seller> {
    return this.prisma.seller.create({ data });
  }

  async findAll(): Promise<Seller[]> {
    return this.prisma.seller.findMany();
  }

  async findById(id: number): Promise<Seller | null> {
    return this.prisma.seller.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SellerUpdateInput): Promise<Seller> {
    return this.prisma.seller.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Seller> {
    return this.prisma.seller.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.seller.count({ where: { id } });
    return count > 0;
  }
}