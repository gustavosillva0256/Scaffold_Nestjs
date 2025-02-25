import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SellerRepository } from '../interfaces/seller.interface';

@Injectable()
export class DeleteSellerService {
  constructor(
    @Inject('SellerRepository')
    private readonly repository: SellerRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Seller não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
