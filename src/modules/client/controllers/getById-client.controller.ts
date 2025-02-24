import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdClientService } from '../services/getById-client.service';
import { ClientDto } from 'src/dtos/client/dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class GetByIdClientController {
  constructor(private readonly getByIdService: GetByIdClientService) {}

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar Client por ID', 
    description: 'Localiza um registro pelo identificador único (ID).' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID válido',
    example: '55' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro encontrado com sucesso.',
    type: ClientDto 
  })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string) {
    const entity = await this.getByIdService.execute(id);
    if (!entity) throw new NotFoundException('Client não encontrado.');
    return entity;
  }
}
