import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdSupplierService } from '../services/getById-supplier.service';
import { SupplierDto } from 'src/dtos/supplier/dto/supplier.dto';

@ApiTags('Supplier')
@Controller('supplier')
export class GetByIdSupplierController {
  constructor(private readonly getByIdService: GetByIdSupplierService) {}

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar Supplier por ID', 
    description: 'Localiza um registro pelo identificador único (UUID).' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID válido',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro encontrado com sucesso.',
    type: SupplierDto 
  })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string) {
    const entity = await this.getByIdService.execute(id);
    if (!entity) throw new NotFoundException('Supplier não encontrado.');
    return entity;
  }
}
