import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ServiceOrderRepository } from '../interfaces/service-order.interface';

@Injectable()
export class DeleteServiceOrderService {
  constructor(
    @Inject('ServiceOrderRepository')
    private readonly repository: ServiceOrderRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('ServiceOrder não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
