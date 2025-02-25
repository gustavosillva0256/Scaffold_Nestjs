import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateProductService } from '../services/create-product.service';
import { CreateProductDto } from 'src/dtos/product/dto/create-product.dto';

@ApiTags('Product')
@Controller('product')
export class CreateProductController {
  constructor(
    private readonly createService: CreateProductService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo Product',
    description: 'Adiciona um novo Product ao sistema.' 
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateProductDto) {
    return this.createService.execute(dto);
  }
}
