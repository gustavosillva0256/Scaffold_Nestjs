import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Supplier } from '@prisma/client';

@Injectable()
export class SupplierPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.prisma.supplier.create({ data });
  }

  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany();
  }

  async findById(id: number): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SupplierUpdateInput): Promise<Supplier> {
    return this.prisma.supplier.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Supplier> {
    return this.prisma.supplier.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.supplier.count({ where: { id } });
    return count > 0;
  }
}