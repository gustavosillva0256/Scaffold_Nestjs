import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateProductDto } from 'src/dtos/product/dto/update-product.dto';
import { ProductRepository } from '../interfaces/product.interface';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) {}

  async execute(id: string, data: UpdateProductDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("Product não encontrado.");
      }

      // 🔹 Impede atualização de certos campos (se necessário)

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar Product:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar Product.");
    }
  }
}
