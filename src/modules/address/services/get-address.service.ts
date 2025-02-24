import { Inject,Injectable } from '@nestjs/common';
import { AddressRepository } from '../interfaces/address.interface';

@Injectable()
export class GetAddressService {
  constructor(
    @Inject('AddressRepository')
    private readonly repository: AddressRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
