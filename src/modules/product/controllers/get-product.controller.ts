import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetProductService } from '../services/get-product.service';
import { ProductDto } from 'src/dtos/product/dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class GetProductController {
  constructor(private readonly getService: GetProductService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Products', 
    description: 'Retorna todos os Products cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [ProductDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
