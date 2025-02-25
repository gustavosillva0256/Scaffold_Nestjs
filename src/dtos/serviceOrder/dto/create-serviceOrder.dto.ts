
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {IsDateString,IsDecimal,IsNotEmpty,IsString} from 'class-validator'




export class CreateServiceOrderDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
description: string ;
@ApiProperty({
  type: 'string',
  format: 'Decimal.js',
})
@IsNotEmpty()
@IsDecimal()
totalValue: Prisma.Decimal ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
@IsNotEmpty()
@IsDateString()
deadline: Date ;
}
