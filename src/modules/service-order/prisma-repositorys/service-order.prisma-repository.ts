import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, ServiceOrder } from '@prisma/client';

@Injectable()
export class ServiceOrderPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ServiceOrderCreateInput): Promise<ServiceOrder> {
    return this.prisma.serviceOrder.create({ data });
  }

  async findAll(): Promise<ServiceOrder[]> {
    return this.prisma.serviceOrder.findMany();
  }

  async findById(id: number): Promise<ServiceOrder | null> {
    return this.prisma.serviceOrder.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ServiceOrderUpdateInput): Promise<ServiceOrder> {
    return this.prisma.serviceOrder.update({ where: { id }, data });
  }

  async delete(id: number): Promise<ServiceOrder> {
    return this.prisma.serviceOrder.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.serviceOrder.count({ where: { id } });
    return count > 0;
  }
}