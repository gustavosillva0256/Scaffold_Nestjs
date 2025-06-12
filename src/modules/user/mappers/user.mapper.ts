import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import type { User } from '@prisma/client';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/dtos/user/dto/update-user.dto';

@Injectable()
export class UserMapper {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}
  // Certifique-se de importar AutomapperModule.forRoot() no módulo

  /**
   * Converte uma entidade Prisma para DTO
   * Adapte este método para mapear relações caso existam (ex: entity.relacao)
   */
  toDto(entity: User): UserDto {
    return this.mapper.map(entity, UserDto, 'User');
  }

  /**
   * Converte um DTO de criação para o formato esperado pelo Prisma
   */
  toCreateInput(dto: CreateUserDto): import('@prisma/client').Prisma.UserCreateInput {
    return {
      // string
      email: dto.email,
      // string  | null
      name: dto.name,
    };
  }

  /**
   * Converte um DTO de atualização para o formato esperado pelo Prisma
   */
  toUpdateInput(dto: UpdateUserDto): import('@prisma/client').Prisma.UserUpdateInput {
    return {
      // string
      email: dto.email,
      // string  | null
      name: dto.name,
    };
  }

  /**
   * Converte uma lista de entidades Prisma para uma lista de DTOs
   */
  toDtoList(entities: User[]): UserDto[] {
    return entities.map(entity => this.toDto(entity));
  }
}

// Profile de mapeamento separado
import { createMap, forMember, mapFrom } from '@automapper/core';
import { Injectable as InjectableProfile } from '@nestjs/common';

@InjectableProfile()
export class UserProfile {
  constructor(mapper: Mapper) {}

  get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, 'User', UserDto);
      // Exemplo de mapeamento manual para relacionamentos:
      // Para 1:N:
      // forMember(
      //   (dest) => dest.comments,
      //   mapFrom((src) => src.comments?.map(item => mapper.map(item, CommentDto, Object)))
      // ),
      // Para 1:1:
      // forMember(
      //   (dest) => dest.author,
      //   mapFrom((src) => src.author && mapper.map(src.author, UserDto, Object))
      // ),
    };
  }
}
// Mapper e Profile separados, imports absolutos para DTOs e exemplos comentados. 

/**
 * Observações:
 * - Os campos são gerados automaticamente a partir dos DTOs.
 * - Adapte validações e transformações conforme necessário.
 */ 