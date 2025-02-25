import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceOrderProductRepository } from '../interfaces/service-order-product.interface';

@Injectable()
export class GetByIdServiceOrderProductService {
  constructor(
    @Inject('ServiceOrderProductRepository')
    private readonly repository: ServiceOrderProductRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('ServiceOrderProduct com ID ' + id + ' não encontrado.');
    return entity;
  }
}
