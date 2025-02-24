import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateAddressDto } from 'src/dtos/address/dto/update-address.dto';
import { AddressRepository } from '../interfaces/address.interface';

@Injectable()
export class UpdateAddressService {
  constructor(
    @Inject('AddressRepository')
    private readonly repository: AddressRepository,
  ) {}

  async execute(id: string, data: UpdateAddressDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("Address não encontrado.");
      }

      // 🔹 Impede atualização de certos campos (se necessário)

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar Address:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar Address.");
    }
  }
}
