import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository') // 🔥 Garante que a injeção funcione
    private readonly repository: UserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<UserDto> {

    return this.repository.create(data);
  }
}
