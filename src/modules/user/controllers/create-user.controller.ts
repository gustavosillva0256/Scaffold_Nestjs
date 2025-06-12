import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';
import { CreateUserService } from '../services/create-user.service';

@Crud({
  model: { type: UserDto },
  dto: { create: CreateUserDto },
  routes: {
    only: ['createOneBase'],
  },
})
@ApiTags('User')
@ApiResponse({ status: 201, description: 'Registro criado com sucesso.', type: UserDto })
@ApiBadRequestResponse({ description: 'Dados inválidos ou incompletos.' })
@ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
@Controller('user')
export class CreateUserController {
  constructor(public service: CreateUserService) {}
} 