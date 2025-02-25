
import {OrderStatus,Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class ServiceOrderDto {
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
