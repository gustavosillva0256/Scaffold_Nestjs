import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateClientDto } from 'src/dtos/client/dto/update-client.dto';
import { ClientRepository } from '../interfaces/client.interface';

@Injectable()
export class UpdateClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly repository: ClientRepository,
  ) {}

  async execute(id: string, data: UpdateClientDto) {
    try {
      // 🔹 Verifica se o registro existe
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new NotFoundException("Client não encontrado.");
      }
     

      // ✅ Atualiza o registro
      return await this.repository.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar Client:", error.message);

      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao atualizar Client.");
    }
  }
}
