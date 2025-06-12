import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { UserDto } from 'src/dtos/user/dto/user.dto';

@Injectable()
export class GetUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(): Promise<UserDto[]> {
    return this.repository.findAll();
  }
}   