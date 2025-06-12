import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { GetUserService } from '../services/get-user.service';

@Crud({
  model: { type: UserDto },
  query: {
    alwaysPaginate: true,
    limit: 20,
    maxLimit: 100,
    //exclude: ['fields', 'select', 'filter', 'or', 'sort', 'join', 'cache'],
  },
  routes: {
    only: ['getManyBase'],
  },
})
@ApiTags('User')
@ApiResponse({ status: 200, description: 'Consulta realizada com sucesso.', type: UserDto, isArray: true })
@ApiBadRequestResponse({ description: 'Dados inválidos ou incompletos.' })
@ApiNotFoundResponse({ description: 'Registro não encontrado.' })
@ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
@Controller('user')
export class GetUserController {
  constructor(public service: GetUserService) {}
} 