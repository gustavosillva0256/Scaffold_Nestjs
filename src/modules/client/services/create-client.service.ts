import { Injectable, Inject, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from 'src/dtos/client/dto/create-client.dto';
import { ClientDto } from 'src/dtos/client/dto/client.dto';
import { ClientRepository } from '../interfaces/client.interface';

@Injectable()
export class CreateClientService {
  constructor(
    @Inject('ClientRepository') 
    private readonly repository: ClientRepository,
  ) {}

  async execute(data: CreateClientDto): Promise<ClientDto> {
    const existingEmail = await this.repository.findByEmail(data.email);
    try {    

      // 🔹 Verifica se registros únicos já existem no banco
      if (existingEmail) {
        throw new ConflictException("Já existe um cliente com este e-mail.");
      }

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar Client:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar Client.");
    }
  }
}
