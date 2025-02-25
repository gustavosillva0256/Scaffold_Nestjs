import { Injectable, Inject, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateSupplierDto } from 'src/dtos/supplier/dto/create-supplier.dto';
import { SupplierDto } from 'src/dtos/supplier/dto/supplier.dto';
import { SupplierRepository } from '../interfaces/supplier.interface';

@Injectable()
export class CreateSupplierService {
  constructor(
    @Inject('SupplierRepository') 
    private readonly repository: SupplierRepository,
  ) {}

  async execute(data: CreateSupplierDto): Promise<SupplierDto> {
    try {
      // 🔹 Verifica se os campos obrigatórios estão preenchidos

      // 🔹 Verifica se registros únicos já existem no banco

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar Supplier:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar Supplier.");
    }
  }
}
