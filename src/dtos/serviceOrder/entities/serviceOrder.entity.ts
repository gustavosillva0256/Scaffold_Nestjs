
import {OrderStatus,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Client} from '../../client/entities/client.entity'
import {Address} from '../../address/entities/address.entity'
import {ServiceOrderProduct} from '../../serviceOrderProduct/entities/serviceOrderProduct.entity'


export class ServiceOrder {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
description: string ;
@ApiProperty({
  enum: OrderStatus,
  enumName: 'OrderStatus',
})
status: OrderStatus ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
totalValue: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
deadline: Date ;
@ApiProperty({
  type: () => Client,
  required: false,
})
client?: Client ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
clientId: number ;
@ApiProperty({
  type: () => Address,
  required: false,
  nullable: true,
})
address?: Address  | null;
@ApiProperty({
  type: () => ServiceOrderProduct,
  isArray: true,
  required: false,
})
products?: ServiceOrderProduct[] ;
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
