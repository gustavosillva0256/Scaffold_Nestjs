import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserService } from '../services/get-user.service';
import { UserDto } from 'src/dtos/user/dto/user.dto';

@ApiTags('User')
@Controller('user')
export class GetUserController {
  constructor(private readonly getService: GetUserService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Users', 
    description: 'Retorna todos os Users cadastrados no sistema.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista retornada com sucesso.',
    type: [UserDto] 
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async execute() {
    return this.getService.execute();
  }
}
