import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAddressService } from '../services/get-address.service';
import { AddressDto } from 'src/dtos/address/dto/address.dto';

@ApiTags('Address')
@Controller('address')
export class GetAddressController {
  constructor(private readonly getService: GetAddressService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Addresss', 
    description: 'Retorna todos os Addresss cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [AddressDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
