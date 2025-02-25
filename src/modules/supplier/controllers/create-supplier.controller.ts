import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateSupplierService } from '../services/create-supplier.service';
import { CreateSupplierDto } from 'src/dtos/supplier/dto/create-supplier.dto';

@ApiTags('Supplier')
@Controller('supplier')
export class CreateSupplierController {
  constructor(
    private readonly createService: CreateSupplierService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo Supplier',
    description: 'Adiciona um novo Supplier ao sistema.' 
  })
  @ApiBody({ type: CreateSupplierDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateSupplierDto) {
    return this.createService.execute(dto);
  }
}
