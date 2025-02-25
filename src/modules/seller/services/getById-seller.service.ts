import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SellerRepository } from '../interfaces/seller.interface';

@Injectable()
export class GetByIdSellerService {
  constructor(
    @Inject('SellerRepository')
    private readonly repository: SellerRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Seller com ID ' + id + ' não encontrado.');
    return entity;
  }
}
