
import {ApiProperty} from '@nestjs/swagger'


export class ServiceOrderProductDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
quantity: number ;
}
