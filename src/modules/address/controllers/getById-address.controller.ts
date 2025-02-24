import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdAddressService } from '../services/getById-address.service';
import { AddressDto } from 'src/dtos/address/dto/address.dto';

@ApiTags('Address')
@Controller('address')
export class GetByIdAddressController {
  constructor(private readonly getByIdService: GetByIdAddressService) {}

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar Address por ID', 
    description: 'Localiza um registro pelo identificador único (UUID).' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID válido',
    example: '55' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro encontrado com sucesso.',
    type: AddressDto 
  })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string) {
    const entity = await this.getByIdService.execute(id);
    if (!entity) throw new NotFoundException('Address não encontrado.');
    return entity;
  }
}
