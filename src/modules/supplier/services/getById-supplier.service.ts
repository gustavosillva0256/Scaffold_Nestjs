import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupplierRepository } from '../interfaces/supplier.interface';

@Injectable()
export class GetByIdSupplierService {
  constructor(
    @Inject('SupplierRepository')
    private readonly repository: SupplierRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Supplier com ID ' + id + ' não encontrado.');
    return entity;
  }
}
