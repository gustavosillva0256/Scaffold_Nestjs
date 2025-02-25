import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { UpdateServiceOrderDto } from "src/dtos/serviceOrder/dto/update-serviceOrder.dto";
import { ServiceOrderRepository } from "../interfaces/service-order.interface";

@Injectable()
export class UpdateServiceOrderService {
  constructor(
    @Inject('ServiceOrderRepository')
    private readonly repository: ServiceOrderRepository,
  ) {}

  async execute(id: string, data: UpdateServiceOrderDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("ServiceOrder não encontrado.");
      }

      // 🔹 Impede atualização de certos campos (se necessário)

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar ServiceOrder:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar ServiceOrder.");
    }
  }
}
