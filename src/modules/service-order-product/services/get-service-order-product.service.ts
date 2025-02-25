import { Inject,Injectable } from '@nestjs/common';
import { ServiceOrderProductRepository } from '../interfaces/service-order-product.interface';

@Injectable()
export class GetServiceOrderProductService {
  constructor(
    @Inject('ServiceOrderProductRepository')
    private readonly repository: ServiceOrderProductRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
