import { Injectable, Inject, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateAddressDto } from 'src/dtos/address/dto/create-address.dto';
import { AddressDto } from 'src/dtos/address/dto/address.dto';
import { AddressRepository } from '../interfaces/address.interface';

@Injectable()
export class CreateAddressService {
  constructor(
    @Inject('AddressRepository') 
    private readonly repository: AddressRepository,
  ) {}

  async execute(data: CreateAddressDto): Promise<AddressDto> {
    try {
      // 🔹 Verifica se os campos obrigatórios estão preenchidos
      if (!data.zipCode || !data.street || !data.number || !data.neighborhood || !data.city || !data.state) {
        throw new BadRequestException("Campos obrigatórios não preenchidos.");
      }
    

      // 🔹 Verifica se registros únicos já existem no banco
      const existingZipCode = await this.repository.findByZipCode(data.zipCode);

      // ✅ Criar o registro
      return await this.repository.create(data);
    } catch (error) {
      console.error("Erro ao criar Address:", error.message);
      
      // 🔹 Relança erros conhecidos diretamente
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      // 🔹 Erro inesperado, relançado como erro interno do servidor
      throw new InternalServerErrorException("Erro ao criar Address.");
    }
  }
}
