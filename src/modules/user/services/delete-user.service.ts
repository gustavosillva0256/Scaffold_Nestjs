import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { UserDto } from 'src/dtos/user/dto/user.dto';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserDto> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      console.error('Erro ao deletar User:', error.message);
      throw new InternalServerErrorException('Erro ao deletar User.');
    }
  }
} 