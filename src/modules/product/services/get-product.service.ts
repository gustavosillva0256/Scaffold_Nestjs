import { Inject,Injectable } from '@nestjs/common';
import { ProductRepository } from '../interfaces/product.interface';

@Injectable()
export class GetProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
