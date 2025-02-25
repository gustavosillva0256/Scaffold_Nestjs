
import {AddressType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class AddressDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
zipCode: string ;
@ApiProperty({
  type: 'string',
})
street: string ;
@ApiProperty({
  type: 'string',
})
number: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
complement: string  | null;
@ApiProperty({
  type: 'string',
})
neighborhood: string ;
@ApiProperty({
  type: 'string',
})
city: string ;
@ApiProperty({
  type: 'string',
})
state: string ;
@ApiProperty({
  enum: AddressType,
  enumName: 'AddressType',
})
type: AddressType ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
}
