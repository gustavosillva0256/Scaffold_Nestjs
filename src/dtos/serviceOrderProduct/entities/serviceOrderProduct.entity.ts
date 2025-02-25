
import {ApiProperty} from '@nestjs/swagger'
import {ServiceOrder} from '../../serviceOrder/entities/serviceOrder.entity'
import {Product} from '../../product/entities/product.entity'


export class ServiceOrderProduct {
  @ApiProperty({
  type: () => ServiceOrder,
  required: false,
})
serviceOrder?: ServiceOrder ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
serviceOrderId: number ;
@ApiProperty({
  type: () => Product,
  required: false,
})
product?: Product ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
productId: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
quantity: number ;
}
