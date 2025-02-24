import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DeleteClientService } from '../services/delete-client.service';

@ApiTags('Client')
@Controller('client')
export class DeleteClientController {
  constructor(private readonly deleteService: DeleteClientService) {}

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Excluir um Client', 
    description: 'Remove permanentemente um Client específico.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do registro',
    example: '55' 
  })
  @ApiResponse({ status: 204, description: 'Registro excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async remove(@Param('id') id: string) {
    const entity = await this.deleteService.execute(id);
    if (!entity) throw new NotFoundException('Client não encontrado.');
    return { message: 'Client excluído com sucesso.' };
  }
}
