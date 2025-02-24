import { Inject,Injectable } from '@nestjs/common';
import { ClientRepository } from '../interfaces/client.interface';

@Injectable()
export class GetClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly repository: ClientRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
