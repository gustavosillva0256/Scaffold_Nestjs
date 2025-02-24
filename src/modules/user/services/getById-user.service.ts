import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class GetByIdUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('User com ID ' + id + ' não encontrado.');
    return entity;
  }
}
