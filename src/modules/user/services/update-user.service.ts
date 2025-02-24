// update-user.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common'; // Adicione o Inject aqui
import { UpdateUserDto } from 'src/dtos/user/dto/update-user.dto';
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string, data: UpdateUserDto) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('User não encontrado');
    }

    return this.repository.update(id, data);
  }
}