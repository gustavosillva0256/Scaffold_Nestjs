import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Client } from '@prisma/client';

@Injectable()
export class ClientPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({ data });
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany({include: {addresses: true},
    });
  }

  async findById(id: number): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id }, include: { addresses: true },
  }); 
  }
  async findByEmail(email: string): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { email } });
  }

  async update(id: number, data: Prisma.ClientUpdateInput): Promise<Client> {
    return this.prisma.client.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Client> {
    return this.prisma.client.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.client.count({ where: { id } });
    return count > 0;
  }
}