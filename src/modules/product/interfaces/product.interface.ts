import { ProductDto } from 'src/dtos/product/dto/product.dto';
import { CreateProductDto } from 'src/dtos/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/dtos/product/dto/update-product.dto';

export interface ProductRepository {
  create(data: CreateProductDto): Promise<ProductDto>;
  findAll(): Promise<ProductDto[]>;
  findById(id: string): Promise<ProductDto | null>;
  update(id: string, data: UpdateProductDto): Promise<ProductDto>;
  delete(id: string): Promise<ProductDto>;
  
}
