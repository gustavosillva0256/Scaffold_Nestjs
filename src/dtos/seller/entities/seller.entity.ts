
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Address} from '../../address/entities/address.entity'


export class Seller {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
email: string ;
@ApiProperty({
  type: () => Address,
  required: false,
  nullable: true,
})
address?: Address  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
commissionRate: Prisma.Decimal ;
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
