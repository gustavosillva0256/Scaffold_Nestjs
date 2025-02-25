import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupplierRepository } from '../interfaces/supplier.interface';

@Injectable()
export class DeleteSupplierService {
  constructor(
    @Inject('SupplierRepository')
    private readonly repository: SupplierRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Supplier não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
