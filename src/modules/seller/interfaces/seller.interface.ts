import { SellerDto } from 'src/dtos/seller/dto/seller.dto';
import { CreateSellerDto } from 'src/dtos/seller/dto/create-seller.dto';
import { UpdateSellerDto } from 'src/dtos/seller/dto/update-seller.dto';

export interface SellerRepository {
  create(data: CreateSellerDto): Promise<SellerDto>;
  findAll(): Promise<SellerDto[]>;
  findById(id: string): Promise<SellerDto | null>;
  update(id: string, data: UpdateSellerDto): Promise<SellerDto>;
  delete(id: string): Promise<SellerDto>;
  
}
