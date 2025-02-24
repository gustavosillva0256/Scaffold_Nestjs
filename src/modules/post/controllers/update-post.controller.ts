import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdatePostService } from '../services/update-post.service';
import { UpdatePostDto } from 'src/dtos/post/dto/update-post.dto';
import { PostDto } from 'src/dtos/post/dto/post.dto';

@ApiTags('post')
@Controller('post')
export class UpdatePostController {
  constructor(
    private readonly updateService: UpdatePostService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[Post] Atualizar registro', 
    description: 'Modifica dados parciais de um Post existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: PostDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}