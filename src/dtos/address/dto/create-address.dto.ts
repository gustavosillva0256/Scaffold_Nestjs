
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString} from 'class-validator'

export class CreateAddressDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
zipCode: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
street: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
number: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
complement?: string  | null;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
neighborhood: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
city: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
state: string ;
}
