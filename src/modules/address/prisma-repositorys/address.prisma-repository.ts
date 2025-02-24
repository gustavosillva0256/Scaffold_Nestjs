import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Address } from '@prisma/client';

@Injectable()
export class AddressPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({ data });
  }

  async findAll(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  async findById(id:number): Promise<Address | null> {
    return this.prisma.address.findUnique({ where: { id } });
  }
  async findByZipCode(id:number, zipCode: string): Promise<Address | null> {
    return this.prisma.address.findUnique({ where: {id, zipCode } });
  }
  async update(id:number, data: Prisma.AddressUpdateInput): Promise<Address> {
    return this.prisma.address.update({ where: { id }, data });
  }

  async delete(id:number): Promise<Address> {
    return this.prisma.address.delete({ where: { id } });
  }

  async exists(id:number): Promise<boolean> {
    const count = await this.prisma.address.count({ where: { id } });
    return count > 0;
  }
}