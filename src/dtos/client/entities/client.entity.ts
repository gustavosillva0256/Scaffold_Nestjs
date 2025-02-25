
import {ApiProperty} from '@nestjs/swagger'
import {Address} from '../../address/entities/address.entity'
import {ServiceOrder} from '../../serviceOrder/entities/serviceOrder.entity'


export class Client {
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
  type: () => ServiceOrder,
  isArray: true,
  required: false,
})
orders?: ServiceOrder[] ;
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
