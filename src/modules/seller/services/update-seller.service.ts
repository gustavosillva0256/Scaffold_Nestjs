import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateSellerDto } from 'src/dtos/seller/dto/update-seller.dto';
import { SellerRepository } from '../interfaces/seller.interface';

@Injectable()
export class UpdateSellerService {
  constructor(
    @Inject('SellerRepository')
    private readonly repository: SellerRepository,
  ) {}

  async execute(id: string, data: UpdateSellerDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("Seller não encontrado.");
      }

      // 🔹 Impede atualização de certos campos (se necessário)

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar Seller:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar Seller.");
    }
  }
}
