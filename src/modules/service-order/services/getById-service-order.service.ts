import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceOrderRepository } from '../interfaces/service-order.interface';

@Injectable()
export class GetByIdServiceOrderService {
  constructor(
    @Inject('ServiceOrderRepository')
    private readonly repository: ServiceOrderRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('ServiceOrder com ID ' + id + ' não encontrado.');
    return entity;
  }
}
