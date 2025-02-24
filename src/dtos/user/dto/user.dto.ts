import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsInt } from 'class-validator';
import { PostDto } from 'src/dtos/post/dto/post.dto';

export class UserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: "John Doe", nullable: true })
  @IsOptional()
  @IsString()
  name?: string | null;

  @ApiProperty({ example: "john@example.com" })
  @IsString()
  email: string;

  @ApiProperty({ type: [PostDto], required: false })
  @IsOptional()
  posts?: PostDto[];
}
