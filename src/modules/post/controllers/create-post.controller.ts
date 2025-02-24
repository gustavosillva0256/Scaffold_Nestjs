import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePostService } from '../services/create-post.service';
import { CreatePostDto } from 'src/dtos/post/dto/create-post.dto';

@ApiTags('Post')
@Controller('post')
export class CreatePostController {
  constructor(
    private readonly createService: CreatePostService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar um novo Post',
    description: 'Adiciona um novo Post ao sistema.' 
  })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou incompletos.' })
  @ApiResponse({ status: 409, description: 'Conflito: dado único já cadastrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
  async create(@Body() dto: CreatePostDto) {
    return this.createService.execute(dto);
  }
}
