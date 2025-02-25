import { CreateServiceOrderProductDto } from "src/dtos/serviceOrderProduct/dto/create-serviceOrderProduct.dto";
import { ServiceOrderProductDto } from "src/dtos/serviceOrderProduct/dto/serviceOrderProduct.dto";
import { UpdateServiceOrderProductDto } from "src/dtos/serviceOrderProduct/dto/update-serviceOrderProduct.dto";

export interface ServiceOrderProductRepository {
  create(data: CreateServiceOrderProductDto): Promise<ServiceOrderProductDto>;
  findAll(): Promise<ServiceOrderProductDto[]>;
  findById(id: string): Promise<ServiceOrderProductDto | null>;
  update(id: string, data: UpdateServiceOrderProductDto): Promise<ServiceOrderProductDto>;
  delete(id: string): Promise<ServiceOrderProductDto>;
  
}
