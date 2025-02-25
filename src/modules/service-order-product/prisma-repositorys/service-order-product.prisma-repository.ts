import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, ServiceOrderProduct } from '@prisma/client';

@Injectable()
export class ServiceOrderProductPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ServiceOrderProductCreateInput): Promise<ServiceOrderProduct> {
    return this.prisma.serviceOrderProduct.create({ data });
  }

  async findAll(): Promise<ServiceOrderProduct[]> {
    return this.prisma.serviceOrderProduct.findMany();
  }
  async findById(serviceOrderId: number, productId: number): Promise<ServiceOrderProduct | null> {
    return this.prisma.serviceOrderProduct.findUnique({ 
      where: { 
        serviceOrderId_productId: { serviceOrderId, productId } 
      } 
    });
  }
  async update(serviceOrderId: number, productId: number, data: Prisma.ServiceOrderProductUpdateInput): Promise<ServiceOrderProduct> {
    return this.prisma.serviceOrderProduct.update({ 
      where: { 
        serviceOrderId_productId: { serviceOrderId, productId }
      }, 
      data 
    });
  }
  async delete(serviceOrderId: number, productId: number): Promise<ServiceOrderProduct> {
    return this.prisma.serviceOrderProduct.delete({ 
      where: { 
        serviceOrderId_productId: { serviceOrderId, productId }
      } 
    });
  }
  async exists(serviceOrderId: number, productId: number): Promise<boolean> {
    const count = await this.prisma.serviceOrderProduct.count({ 
      where: { 
          serviceOrderId, productId 
      } 
    });
    return count > 0;
  }
  
}