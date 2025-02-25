import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdServiceOrderProductService } from '../services/getById-service-order-product.service';
import { ServiceOrderProductDto } from 'src/dtos/serviceOrderProduct/dto/serviceOrderProduct.dto';

@ApiTags('ServiceOrderProduct')
@Controller('service-order-product')
export class GetByIdServiceOrderProductController {
  constructor(private readonly getByIdService: GetByIdServiceOrderProductService) {}

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar ServiceOrderProduct por ID', 
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
    type: ServiceOrderProductDto 
  })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string) {
    const entity = await this.getByIdService.execute(id);
    if (!entity) throw new NotFoundException('ServiceOrderProduct não encontrado.');
    return entity;
  }
}
