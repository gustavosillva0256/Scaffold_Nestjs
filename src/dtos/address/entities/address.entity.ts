
import {AddressType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Client} from '../../client/entities/client.entity'
import {Supplier} from '../../supplier/entities/supplier.entity'
import {Seller} from '../../seller/entities/seller.entity'
import {ServiceOrder} from '../../serviceOrder/entities/serviceOrder.entity'


export class Address {
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
  type: 'integer',
  format: 'int32',
  nullable: true,
})
clientId: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
supplierId: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
sellerId: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
serviceOrderId: number  | null;
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
@ApiProperty({
  type: () => Client,
  required: false,
  nullable: true,
})
client?: Client  | null;
@ApiProperty({
  type: () => Supplier,
  required: false,
  nullable: true,
})
supplier?: Supplier  | null;
@ApiProperty({
  type: () => Seller,
  required: false,
  nullable: true,
})
seller?: Seller  | null;
@ApiProperty({
  type: () => ServiceOrder,
  required: false,
  nullable: true,
})
serviceOrder?: ServiceOrder  | null;
}
