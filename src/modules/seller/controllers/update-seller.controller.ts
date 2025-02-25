import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateSellerService } from '../services/update-seller.service';

import { SellerDto } from 'src/dtos/seller/dto/seller.dto';
import { UpdateSellerDto } from 'src/dtos/seller/dto/update-seller.dto';

@ApiTags('Seller')
@Controller('seller')
export class UpdateSellerController {
  constructor(
    private readonly updateService: UpdateSellerService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[Seller] Atualizar registro', 
    description: 'Modifica dados parciais de um Seller existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdateSellerDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: SellerDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSellerDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}