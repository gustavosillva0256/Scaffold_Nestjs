import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(
    private readonly createService: CreateUserService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo User',
    description: 'Adiciona um novo User ao sistema.' 
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreateUserDto) {
    return this.createService.execute(dto);
  }
}
