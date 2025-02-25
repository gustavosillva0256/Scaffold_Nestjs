import { CreateServiceOrderDto } from "src/dtos/serviceOrder/dto/create-serviceOrder.dto";
import { ServiceOrderDto } from "src/dtos/serviceOrder/dto/serviceOrder.dto";
import { UpdateServiceOrderDto } from "src/dtos/serviceOrder/dto/update-serviceOrder.dto";

export interface ServiceOrderRepository {
  create(data: CreateServiceOrderDto): Promise<ServiceOrderDto>;
  findAll(): Promise<ServiceOrderDto[]>;
  findById(id: string): Promise<ServiceOrderDto | null>;
  update(id: string, data: UpdateServiceOrderDto): Promise<ServiceOrderDto>;
  delete(id: string): Promise<ServiceOrderDto>;
  
}
