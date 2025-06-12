import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { UpdateUserService } from '../services/update-user.service';

@Crud({
  model: { type: UserDto },
  routes: {
    only: ['updateOneBase'],
  },
})
@ApiTags('User')
@ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.', type: UserDto })
@ApiBadRequestResponse({ description: 'Dados inválidos ou incompletos.' })
@ApiNotFoundResponse({ description: 'Registro não encontrado.' })
@ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
@Controller('user')
export class UpdateUserController {
  constructor(public service: UpdateUserService) {}
} 