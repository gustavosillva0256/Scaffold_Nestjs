import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetServiceOrderProductService } from '../services/get-service-order-product.service';
import { ServiceOrderProductDto } from 'src/dtos/serviceOrderProduct/dto/serviceOrderProduct.dto';

@ApiTags('ServiceOrderProduct')
@Controller('service-order-product')
export class GetServiceOrderProductController {
  constructor(private readonly getService: GetServiceOrderProductService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os ServiceOrderProducts', 
    description: 'Retorna todos os ServiceOrderProducts cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [ServiceOrderProductDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
