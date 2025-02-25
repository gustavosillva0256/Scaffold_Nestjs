import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetSupplierService } from '../services/get-supplier.service';
import { SupplierDto } from 'src/dtos/supplier/dto/supplier.dto';

@ApiTags('Supplier')
@Controller('supplier')
export class GetSupplierController {
  constructor(private readonly getService: GetSupplierService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Suppliers', 
    description: 'Retorna todos os Suppliers cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [SupplierDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
