import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateSupplierService } from '../services/update-supplier.service';

import { SupplierDto } from 'src/dtos/supplier/dto/supplier.dto';
import { UpdateSupplierDto } from 'src/dtos/supplier/dto/update-supplier.dto';

@ApiTags('Supplier')
@Controller('supplier')
export class UpdateSupplierController {
  constructor(
    private readonly updateService: UpdateSupplierService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[Supplier] Atualizar registro', 
    description: 'Modifica dados parciais de um Supplier existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdateSupplierDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: SupplierDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}