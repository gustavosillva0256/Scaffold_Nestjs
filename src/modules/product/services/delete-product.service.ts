import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../interfaces/product.interface';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Product não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
