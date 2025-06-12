
import {ApiProperty} from '@nestjs/swagger'
import {Post} from '../../post/entities/post.entity'


export class Comment {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
text: string ;
@ApiProperty({
  type: () => Post,
  required: false,
})
post?: Post ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
postId: number ;
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
