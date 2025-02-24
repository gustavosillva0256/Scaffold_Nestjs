import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateAddressService } from '../services/create-address.service';
import { CreateAddressDto } from 'src/dtos/address/dto/create-address.dto';

@ApiTags('Address')
@Controller('address')
export class CreateAddressController {
  constructor(
    private readonly createService: CreateAddressService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo Address',
    description: 'Adiciona um novo Address ao sistema.' 
  })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateAddressDto) {
    return this.createService.execute(dto);
  }
}
