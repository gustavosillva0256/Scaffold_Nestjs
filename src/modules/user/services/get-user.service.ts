import { Inject,Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';

@Injectable()
export class GetUserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
