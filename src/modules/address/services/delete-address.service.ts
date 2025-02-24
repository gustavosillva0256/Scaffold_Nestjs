import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../interfaces/address.interface';

@Injectable()
export class DeleteAddressService {
  constructor(
    @Inject('AddressRepository')
    private readonly repository: AddressRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Address não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
