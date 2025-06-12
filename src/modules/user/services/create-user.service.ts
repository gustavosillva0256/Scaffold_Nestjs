import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<UserDto> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      console.error('Erro ao criar User:', error.message);
      throw new InternalServerErrorException('Erro ao criar User.');
    }
  }
}
// Service apenas delega ao repositório, sem lógica extra. 