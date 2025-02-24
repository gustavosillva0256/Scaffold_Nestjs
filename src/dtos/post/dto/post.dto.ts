import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class PostDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: "Título do Post" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Conteúdo do post", nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  authorId: number;
}
