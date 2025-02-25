import { Injectable, Inject, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateSellerDto } from 'src/dtos/seller/dto/create-seller.dto';
import { SellerDto } from 'src/dtos/seller/dto/seller.dto';
import { SellerRepository } from '../interfaces/seller.interface';

@Injectable()
export class CreateSellerService {
  constructor(
    @Inject('SellerRepository') 
    private readonly repository: SellerRepository,
  ) {}

  async execute(data: CreateSellerDto): Promise<SellerDto> {
    try {
      // 🔹 Verifica se os campos obrigatórios estão preenchidos

      // 🔹 Verifica se registros únicos já existem no banco

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar Seller:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar Seller.");
    }
  }
}
