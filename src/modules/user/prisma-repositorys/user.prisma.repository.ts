import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../interfaces/user.interface';
import { UserDto } from 'src/dtos/user/dto/user.dto';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/dtos/user/dto/update-user.dto';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    return this.prisma.user.create({ data: data as Prisma.UserCreateInput }) as unknown as UserDto;
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany() as unknown as UserDto[];
  }

  async findById(id: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } }) as unknown as UserDto | null;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserDto> {
    return this.prisma.user.update({ where: { id: Number(id) }, data: data as Prisma.UserUpdateInput }) as unknown as UserDto;
  }

  async delete(id: string): Promise<UserDto> {
    return this.prisma.user.delete({ where: { id: Number(id) } }) as unknown as UserDto;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.user.count({ where: { id: Number(id) } });
    return count > 0;
  }

  // Método genérico para verificação de existência por campo único
  // Ajuste conforme o campo único da entidade (exemplo: email, name)
  // async findByUniqueField(fieldValue: string, fieldName: string = 'email'): Promise<UserDto | null> {
  //   return this.prisma.user.findUnique({ where: { [fieldName]: fieldValue } }) as UserDto | null;
  // }
}