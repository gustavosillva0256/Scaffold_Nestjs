import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ClientRepository } from '../interfaces/client.interface';

@Injectable()
export class DeleteClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly repository: ClientRepository,
  ) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Client não encontrado');
    }

    return this.repository.delete(id);
  }
} // 🔥 Certifique-se de que o arquivo termina corretamente!
