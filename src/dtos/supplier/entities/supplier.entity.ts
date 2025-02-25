
import {ApiProperty} from '@nestjs/swagger'
import {Address} from '../../address/entities/address.entity'
import {Product} from '../../product/entities/product.entity'


export class Supplier {
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
  type: 'string',
})
phone: string ;
@ApiProperty({
  type: () => Address,
  isArray: true,
  required: false,
})
addresses?: Address[] ;
@ApiProperty({
  type: () => Product,
  isArray: true,
  required: false,
})
products?: Product[] ;
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
