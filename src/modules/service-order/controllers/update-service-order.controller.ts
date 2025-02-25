import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateServiceOrderService } from '../services/update-service-order.service';
import { ServiceOrderDto } from 'src/dtos/serviceOrder/dto/serviceOrder.dto';
import { UpdateServiceOrderDto } from 'src/dtos/serviceOrder/dto/update-serviceOrder.dto';


@ApiTags('Service-order')
@Controller('service-order')
export class UpdateServiceOrderController {
  constructor(
    private readonly updateService: UpdateServiceOrderService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[ServiceOrder] Atualizar registro', 
    description: 'Modifica dados parciais de um ServiceOrder existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdateServiceOrderDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: ServiceOrderDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}