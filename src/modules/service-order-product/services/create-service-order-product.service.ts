import { Injectable, Inject, BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateServiceOrderProductDto } from "src/dtos/serviceOrderProduct/dto/create-serviceOrderProduct.dto";
import { ServiceOrderProductDto } from "src/dtos/serviceOrderProduct/dto/serviceOrderProduct.dto";
import { ServiceOrderProductRepository } from "../interfaces/service-order-product.interface";

@Injectable()
export class CreateServiceOrderProductService {
  constructor(
    @Inject('ServiceOrderProductRepository') 
    private readonly repository: ServiceOrderProductRepository,
  ) {}

  async execute(data: CreateServiceOrderProductDto): Promise<ServiceOrderProductDto> {
    try {
      // 🔹 Verifica se os campos obrigatórios estão preenchidos

      // 🔹 Verifica se registros únicos já existem no banco

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar ServiceOrderProduct:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar ServiceOrderProduct.");
    }
  }
}
