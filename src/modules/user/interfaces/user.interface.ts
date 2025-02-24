import { UserDto } from 'src/dtos/user/dto/user.dto';
import { CreateUserDto } from 'src/dtos/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/dtos/user/dto/update-user.dto';

export interface UserRepository {
  create(data: CreateUserDto): Promise<UserDto>;
  findAll(): Promise<UserDto[]>;
  findById(id: string): Promise<UserDto | null>;
  update(id: string, data: UpdateUserDto): Promise<UserDto>;
  delete(id: string): Promise<UserDto>;
  
}
