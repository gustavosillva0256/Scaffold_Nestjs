import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { UpdateServiceOrderProductDto } from "src/dtos/serviceOrderProduct/dto/update-serviceOrderProduct.dto";
import { ServiceOrderProductRepository } from "../interfaces/service-order-product.interface";

@Injectable()
export class UpdateServiceOrderProductService {
  constructor(
    @Inject('ServiceOrderProductRepository')
    private readonly repository: ServiceOrderProductRepository,
  ) {}

  async execute(id: string, data: UpdateServiceOrderProductDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("ServiceOrderProduct não encontrado.");
      }

      // 🔹 Impede atualização de certos campos (se necessário)

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar ServiceOrderProduct:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar ServiceOrderProduct.");
    }
  }
}
