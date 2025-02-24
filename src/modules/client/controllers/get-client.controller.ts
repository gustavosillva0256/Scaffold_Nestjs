import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetClientService } from '../services/get-client.service';
import { ClientDto } from 'src/dtos/client/dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class GetClientController {
  constructor(private readonly getService: GetClientService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Clients', 
    description: 'Retorna todos os Clients cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [ClientDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
