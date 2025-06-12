import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { UpdateUserDto } from 'src/dtos/user/dto/update-user.dto';
import { UserDto } from 'src/dtos/user/dto/user.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string, data: UpdateUserDto): Promise<UserDto> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      console.error('Erro ao atualizar User:', error.message);
      throw new InternalServerErrorException('Erro ao atualizar User.');
    }
  }
} 