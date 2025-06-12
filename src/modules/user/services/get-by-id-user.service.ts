import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class GetByIdUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserDto> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException('User não encontrado.');
      }
      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Erro ao buscar User por ID:', error.message);
      throw new InternalServerErrorException('Erro ao buscar User por ID.');
    }
  }
}
// Nome padronizado: GetByIdUserService e get-by-id-user.service.ts 