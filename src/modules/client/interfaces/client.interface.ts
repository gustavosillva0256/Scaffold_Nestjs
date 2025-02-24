import { ClientDto } from 'src/dtos/client/dto/client.dto';
import { CreateClientDto } from 'src/dtos/client/dto/create-client.dto';
import { UpdateClientDto } from 'src/dtos/client/dto/update-client.dto';

export interface ClientRepository {
  create(data: CreateClientDto): Promise<ClientDto>;
  findAll(): Promise<ClientDto[]>;
  findById(id: string): Promise<ClientDto | null>;
  findByEmail(email: string): Promise<ClientDto | null>;
  update(id: string, data: UpdateClientDto): Promise<ClientDto>;
  delete(id: string): Promise<ClientDto>;
  
}
