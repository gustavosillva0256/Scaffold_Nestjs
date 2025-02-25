import { Injectable, Inject, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/product/dto/create-product.dto';
import { ProductDto } from 'src/dtos/product/dto/product.dto';
import { ProductRepository } from '../interfaces/product.interface';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject('ProductRepository') 
    private readonly repository: ProductRepository,
  ) {}

  async execute(data: CreateProductDto): Promise<ProductDto> {
    try {
      // 🔹 Verifica se os campos obrigatórios estão preenchidos

      // 🔹 Verifica se registros únicos já existem no banco

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar Product:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar Product.");
    }
  }
}
