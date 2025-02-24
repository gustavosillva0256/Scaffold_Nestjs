import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../interfaces/address.interface';

@Injectable()
export class GetByIdAddressService {
  constructor(
    @Inject('AddressRepository')
    private readonly repository: AddressRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Address com ID ' + id + ' não encontrado.');
    return entity;
  }
}
