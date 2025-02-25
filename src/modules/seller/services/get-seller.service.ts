import { Inject,Injectable } from '@nestjs/common';
import { SellerRepository } from '../interfaces/seller.interface';

@Injectable()
export class GetSellerService {
  constructor(
    @Inject('SellerRepository')
    private readonly repository: SellerRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
