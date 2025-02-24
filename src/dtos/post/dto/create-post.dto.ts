
import {ApiProperty} from '@nestjs/swagger'
import {IsInt, IsNotEmpty,IsOptional,IsString} from 'class-validator'




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

@ApiProperty({ example: 1 })
  @IsInt()
  authorId: number;
}

