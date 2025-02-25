import { Injectable, Inject, BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateServiceOrderDto } from "src/dtos/serviceOrder/dto/create-serviceOrder.dto";
import { ServiceOrderDto } from "src/dtos/serviceOrder/dto/serviceOrder.dto";
import { ServiceOrderRepository } from "../interfaces/service-order.interface";

@Injectable()
export class CreateServiceOrderService {
  constructor(
    @Inject('ServiceOrderRepository') 
    private readonly repository: ServiceOrderRepository,
  ) {}

  async execute(data: CreateServiceOrderDto): Promise<ServiceOrderDto> {
    try {
      // 🔹 Verifica se os campos obrigatórios estão preenchidos

      // 🔹 Verifica se registros únicos já existem no banco

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar ServiceOrder:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar ServiceOrder.");
    }
  }
}
