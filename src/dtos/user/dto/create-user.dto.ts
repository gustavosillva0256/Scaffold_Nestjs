
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString} from 'class-validator'
import { PostDto } from 'src/dtos/post/dto/post.dto';




export class CreateUserDto {
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
})
@IsNotEmpty()
@IsString()
email: string ;

@ApiProperty({ type: [PostDto], required: false })
@IsOptional()
posts?: PostDto[];

}
