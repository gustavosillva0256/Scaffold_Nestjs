// Controller para buscar por ID: GetByIdUserController
// Importa o service: GetByIdUserService de '../services/get-by-id-user.service'
// Arquivo do service: get-by-id-user.service.ts
//
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { GetByIdUserService } from '../services/get-by-id-user.service';

@Crud({
  model: { type: UserDto },
  query: {
    alwaysPaginate: true,
    limit: 20,
    maxLimit: 100,
    //exclude: ['fields', 'select', 'filter', 'or', 'sort', 'join', 'cache'],
  },
  routes: {
    only: ['getOneBase'],
  },
})
@ApiTags('User')
@ApiResponse({ status: 200, description: 'Consulta realizada com sucesso.', type: UserDto })
@ApiBadRequestResponse({ description: 'Dados inválidos ou incompletos.' })
@ApiNotFoundResponse({ description: 'Registro não encontrado.' })
@ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
@Controller('user')
export class GetByIdUserController {
  constructor(public service: GetByIdUserService) {}
} 