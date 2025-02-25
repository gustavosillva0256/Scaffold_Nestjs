import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateSellerService } from '../services/create-seller.service';
import { CreateSellerDto } from 'src/dtos/seller/dto/create-seller.dto';

@ApiTags('Seller')
@Controller('seller')
export class CreateSellerController {
  constructor(
    private readonly createService: CreateSellerService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo Seller',
    description: 'Adiciona um novo Seller ao sistema.' 
  })
  @ApiBody({ type: CreateSellerDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateSellerDto) {
    return this.createService.execute(dto);
  }
}
