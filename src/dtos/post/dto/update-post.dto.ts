
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString} from 'class-validator'




export class UpdatePostDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
title?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
content?: string  | null;
}
