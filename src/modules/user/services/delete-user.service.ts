// delete-user.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common'; // Adicione o Inject aqui
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('User não encontrado.');

    return this.repository.delete(id);
  }
}