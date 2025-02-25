
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Supplier} from '../../supplier/entities/supplier.entity'
import {ServiceOrderProduct} from '../../serviceOrderProduct/entities/serviceOrderProduct.entity'


export class Product {
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
  nullable: true,
})
description: string  | null;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
unitPrice: Prisma.Decimal ;
@ApiProperty({
  type: () => Supplier,
  required: false,
})
supplier?: Supplier ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
supplierId: number ;
@ApiProperty({
  type: () => ServiceOrderProduct,
  isArray: true,
  required: false,
})
orders?: ServiceOrderProduct[] ;
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
