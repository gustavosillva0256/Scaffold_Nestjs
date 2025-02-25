import { SupplierDto } from 'src/dtos/supplier/dto/supplier.dto';
import { CreateSupplierDto } from 'src/dtos/supplier/dto/create-supplier.dto';
import { UpdateSupplierDto } from 'src/dtos/supplier/dto/update-supplier.dto';

export interface SupplierRepository {
  create(data: CreateSupplierDto): Promise<SupplierDto>;
  findAll(): Promise<SupplierDto[]>;
  findById(id: string): Promise<SupplierDto | null>;
  update(id: string, data: UpdateSupplierDto): Promise<SupplierDto>;
  delete(id: string): Promise<SupplierDto>;
  
}
