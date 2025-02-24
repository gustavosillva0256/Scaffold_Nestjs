import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateUserService } from '../services/update-user.service';
import { UpdateUserDto } from 'src/dtos/user/dto/update-user.dto';
import { UserDto } from 'src/dtos/user/dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UpdateUserController {
  constructor(
    private readonly updateService: UpdateUserService,
  ) {}

  @Patch(':id')
  @ApiOperation({ 
    summary: '[User] Atualizar registro', 
    description: 'Modifica dados parciais de um User existente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do registro',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro atualizado',
    type: UserDto 
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Registro não localizado' })
  @ApiResponse({ status: 500, description: 'Falha na atualização' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.updateService.execute(id, dto);
  }
}