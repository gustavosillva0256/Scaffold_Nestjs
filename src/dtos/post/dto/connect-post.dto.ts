
import {ApiProperty} from '@nestjs/swagger'
import {IsInt,IsNotEmpty} from 'class-validator'




export class ConnectPostDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
@IsNotEmpty()
@IsInt()
id: number ;
}
