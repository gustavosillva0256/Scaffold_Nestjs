import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateAddressService } from '../services/update-address.service';
import { AddressDto } from 'src/dtos/address/dto/address.dto';
import { UpdateAddressDto } from 'src/dtos/address/dto/update-address.dto';

@ApiTags('Address')
@Controller('address')
export class UpdateAddressController {
  constructor(
    private readonly updateService: UpdateAddressService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[Address] Atualizar registro', 
    description: 'Modifica dados parciais de um Address existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do registro',
    example: '55' 
  })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: AddressDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}