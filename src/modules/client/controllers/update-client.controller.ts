import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateClientService } from '../services/update-client.service';
import { ClientDto } from 'src/dtos/client/dto/client.dto';
import { UpdateClientDto } from 'src/dtos/client/dto/update-client.dto';

@ApiTags('Client')
@Controller('client')
export class UpdateClientController {
  constructor(
    private readonly updateService: UpdateClientService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[Client] Atualizar registro', 
    description: 'Modifica dados parciais de um Client existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do registro',
    example: '55' 
  })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: ClientDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}