import { Inject,Injectable } from '@nestjs/common';
import { SupplierRepository } from '../interfaces/supplier.interface';

@Injectable()
export class GetSupplierService {
  constructor(
    @Inject('SupplierRepository')
    private readonly repository: SupplierRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
