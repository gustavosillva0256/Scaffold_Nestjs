import { Inject,Injectable } from '@nestjs/common';
import { ServiceOrderRepository } from '../interfaces/service-order.interface';

@Injectable()
export class GetServiceOrderService {
  constructor(
    @Inject('ServiceOrderRepository')
    private readonly repository: ServiceOrderRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
