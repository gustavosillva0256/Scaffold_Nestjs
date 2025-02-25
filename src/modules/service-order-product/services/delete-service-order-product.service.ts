import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ServiceOrderProductRepository } from '../interfaces/service-order-product.interface';

@Injectable()
export class DeleteServiceOrderProductService {
  constructor(
    @Inject('ServiceOrderProductRepository')
    private readonly repository: ServiceOrderProductRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('ServiceOrderProduct não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
