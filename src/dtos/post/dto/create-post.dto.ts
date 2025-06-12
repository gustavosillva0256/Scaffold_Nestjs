
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreatePostDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
title: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
content?: string  | null;
}
