
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsInt,IsNotEmpty,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

class ServiceOrderProductServiceOrderIdProductIdUniqueInputDto {
    @ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
serviceOrderId: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
productId: number ;
  }

@ApiExtraModels(ServiceOrderProductServiceOrderIdProductIdUniqueInputDto)
export class ConnectServiceOrderProductDto {
  @ApiProperty({
  type: ServiceOrderProductServiceOrderIdProductIdUniqueInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => ServiceOrderProductServiceOrderIdProductIdUniqueInputDto)
serviceOrderId_productId: ServiceOrderProductServiceOrderIdProductIdUniqueInputDto ;
}
