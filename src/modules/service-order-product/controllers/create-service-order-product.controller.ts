import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateServiceOrderProductService } from '../services/create-service-order-product.service';
import { CreateServiceOrderProductDto } from 'src/dtos/serviceOrderProduct/dto/create-serviceOrderProduct.dto';

@ApiTags('ServiceOrderProduct')
@Controller('service-order-product')
export class CreateServiceOrderProductController {
  constructor(
    private readonly createService: CreateServiceOrderProductService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo ServiceOrderProduct',
    description: 'Adiciona um novo ServiceOrderProduct ao sistema.' 
  })
  @ApiBody({ type: CreateServiceOrderProductDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateServiceOrderProductDto) {
    return this.createService.execute(dto);
  }
}
