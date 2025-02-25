import { Controller, Delete, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DeleteProductService } from '../services/delete-product.service';

@ApiTags('Product')
@Controller('product')
export class DeleteProductController {
  constructor(private readonly deleteService: DeleteProductService) {}

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Excluir um Product', 
    description: 'Remove permanentemente um Product específico.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiResponse({ status: 204, description: 'Registro excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async remove(@Param('id') id: string) {
    const entity = await this.deleteService.execute(id);
    if (!entity) throw new NotFoundException('Product não encontrado.');
    return { message: 'Product excluído com sucesso.' };
  }
}
