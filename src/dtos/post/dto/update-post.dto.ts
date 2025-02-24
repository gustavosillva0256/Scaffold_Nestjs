
import {ApiProperty} from '@nestjs/swagger'
import {IsInt, IsOptional,IsString} from 'class-validator'




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

@ApiProperty({ example: 1 })
  @IsInt()
  authorId: number;
}
