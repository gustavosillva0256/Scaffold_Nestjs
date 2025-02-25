import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateServiceOrderProductService } from '../services/update-service-order-product.service';
import { ServiceOrderProductDto } from 'src/dtos/serviceOrderProduct/dto/serviceOrderProduct.dto';
import { UpdateServiceOrderProductDto } from 'src/dtos/serviceOrderProduct/dto/update-serviceOrderProduct.dto';

@ApiTags('Service-order-product')
@Controller('service-order-product')
export class UpdateServiceOrderProductController {
  constructor(
    private readonly updateService: UpdateServiceOrderProductService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[ServiceOrderProduct] Atualizar registro', 
    description: 'Modifica dados parciais de um ServiceOrderProduct existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdateServiceOrderProductDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: ServiceOrderProductDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderProductDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}