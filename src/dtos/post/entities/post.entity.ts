
import {ApiProperty} from '@nestjs/swagger'
import {User} from '../../user/entities/user.entity'


export class Post {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
title: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
content: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
authorId: number ;
@ApiProperty({
  type: 'boolean',
})
published: boolean ;
@ApiProperty({
  type: () => User,
  required: false,
})
author?: User ;
}
