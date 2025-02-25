import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetSellerService } from '../services/get-seller.service';
import { SellerDto } from 'src/dtos/seller/dto/seller.dto';

@ApiTags('Seller')
@Controller('seller')
export class GetSellerController {
  constructor(private readonly getService: GetSellerService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Sellers', 
    description: 'Retorna todos os Sellers cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [SellerDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
