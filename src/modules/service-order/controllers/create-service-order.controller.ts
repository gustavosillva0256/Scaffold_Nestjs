import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateServiceOrderService } from '../services/create-service-order.service';
import { CreateServiceOrderDto } from 'src/dtos/serviceOrder/dto/create-serviceOrder.dto';


@ApiTags('ServiceOrder')
@Controller('service-order')
export class CreateServiceOrderController {
  constructor(
    private readonly createService: CreateServiceOrderService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo ServiceOrder',
    description: 'Adiciona um novo ServiceOrder ao sistema.' 
  })
  @ApiBody({ type: CreateServiceOrderDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateServiceOrderDto) {
    return this.createService.execute(dto);
  }
}
