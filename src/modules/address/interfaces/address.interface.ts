import { AddressDto } from 'src/dtos/address/dto/address.dto';
import { CreateAddressDto } from 'src/dtos/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/dtos/address/dto/update-address.dto';

export interface AddressRepository {
  create(data: CreateAddressDto): Promise<AddressDto>;
  findAll(): Promise<AddressDto[]>;
  findById(id: string): Promise<AddressDto | null>;
  findByZipCode(zipCode: string): Promise<AddressDto | null>;
  update(id: string, data: UpdateAddressDto): Promise<AddressDto>;
  delete(id: string): Promise<AddressDto>;
  
}
