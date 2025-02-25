import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateSupplierDto } from 'src/dtos/supplier/dto/update-supplier.dto';
import { SupplierRepository } from '../interfaces/supplier.interface';

@Injectable()
export class UpdateSupplierService {
  constructor(
    @Inject('SupplierRepository')
    private readonly repository: SupplierRepository,
  ) {}

  async execute(id: string, data: UpdateSupplierDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("Supplier não encontrado.");
      }

      // 🔹 Impede atualização de certos campos (se necessário)

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar Supplier:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar Supplier.");
    }
  }
}
