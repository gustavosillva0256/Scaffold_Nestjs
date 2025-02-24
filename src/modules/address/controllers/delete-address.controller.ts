import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DeleteAddressService } from '../services/delete-address.service';

@ApiTags('Address')
@Controller('address')
export class DeleteAddressController {
  constructor(private readonly deleteService: DeleteAddressService) {}

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Excluir um Address', 
    description: 'Remove permanentemente um Address específico.' 
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
    if (!entity) throw new NotFoundException('Address não encontrado.');
    return { message: 'Address excluído com sucesso.' };
  }
}
