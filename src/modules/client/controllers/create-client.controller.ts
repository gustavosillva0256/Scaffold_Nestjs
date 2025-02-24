import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateClientService } from '../services/create-client.service';
import { CreateClientDto } from 'src/dtos/client/dto/create-client.dto';

@ApiTags('Client')
@Controller('client')
export class CreateClientController {
  constructor(
    private readonly createService: CreateClientService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo Client',
    description: 'Adiciona um novo Client ao sistema.' 
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateClientDto) {
    return this.createService.execute(dto);
  }
}
