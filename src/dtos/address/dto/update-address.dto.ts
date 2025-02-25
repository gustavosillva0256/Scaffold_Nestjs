
import {AddressType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString} from 'class-validator'




export class UpdateAddressDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
zipCode?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
street?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
number?: string ;
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
  required: false,
})
@IsOptional()
@IsString()
neighborhood?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
city?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
state?: string ;
@ApiProperty({
  enum: AddressType,
  enumName: 'AddressType',
  required: false,
})
@IsOptional()
type?: AddressType ;
}
