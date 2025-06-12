
import {ApiProperty} from '@nestjs/swagger'
import {User} from '../../user/entities/user.entity'
import {Comment} from '../../comment/entities/comment.entity'


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
  type: 'boolean',
})
published: boolean ;
@ApiProperty({
  type: () => User,
  required: false,
})
author?: User ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
authorId: number ;
@ApiProperty({
  type: () => Comment,
  isArray: true,
  required: false,
})
comments?: Comment[] ;
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
