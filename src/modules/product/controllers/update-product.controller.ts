import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateProductService } from '../services/update-product.service';

import { ProductDto } from 'src/dtos/product/dto/product.dto';
import { UpdateProductDto } from 'src/dtos/product/dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class UpdateProductController {
  constructor(
    private readonly updateService: UpdateProductService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[Product] Atualizar registro', 
    description: 'Modifica dados parciais de um Product existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: ProductDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}