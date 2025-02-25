import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../interfaces/product.interface';

@Injectable()
export class GetByIdProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Product com ID ' + id + ' não encontrado.');
    return entity;
  }
}
