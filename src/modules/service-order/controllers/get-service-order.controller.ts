import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetServiceOrderService } from '../services/get-service-order.service';
import { ServiceOrderDto } from 'src/dtos/serviceOrder/dto/serviceOrder.dto';


@ApiTags('ServiceOrder')
@Controller('service-order')
export class GetServiceOrderController {
  constructor(private readonly getService: GetServiceOrderService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os ServiceOrders', 
    description: 'Retorna todos os ServiceOrders cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [ServiceOrderDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
