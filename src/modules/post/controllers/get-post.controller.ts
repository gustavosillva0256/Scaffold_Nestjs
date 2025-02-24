import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPostService } from '../services/get-post.service';
import { PostDto } from 'src/dtos/post/dto/post.dto';

@ApiTags('Post')
@Controller('post')
export class GetPostController {
  constructor(private readonly getService: GetPostService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Posts', 
    description: 'Retorna todos os Posts cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [PostDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
