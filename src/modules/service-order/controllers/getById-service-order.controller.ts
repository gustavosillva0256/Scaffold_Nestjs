import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdServiceOrderService } from '../services/getById-service-order.service';
import { ServiceOrderDto } from 'src/dtos/serviceOrder/dto/serviceOrder.dto';


@ApiTags('ServiceOrder')
@Controller('service-order')
export class GetByIdServiceOrderController {
  constructor(private readonly getByIdService: GetByIdServiceOrderService) {}

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar ServiceOrder por ID', 
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
    type: ServiceOrderDto 
  })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string) {
    const entity = await this.getByIdService.execute(id);
    if (!entity) throw new NotFoundException('ServiceOrder não encontrado.');
    return entity;
  }
}
