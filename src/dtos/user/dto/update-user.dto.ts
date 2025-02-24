
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString} from 'class-validator'
import { PostDto } from 'src/dtos/post/dto/post.dto';




export class UpdateUserDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
name?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
email?: string ;
 @ApiProperty({ type: [PostDto], required: false })
  @IsOptional()
  posts?: PostDto[];
}
