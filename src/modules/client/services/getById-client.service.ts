import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../interfaces/client.interface';

@Injectable()
export class GetByIdClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly repository: ClientRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Client com ID ' + id + ' não encontrado.');
    return entity;
  }
}
