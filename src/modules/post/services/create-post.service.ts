import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreatePostDto } from 'src/dtos/post/dto/create-post.dto';
import { PostDto } from 'src/dtos/post/dto/post.dto';
import { PostRepository } from '../interfaces/post.interface';

@Injectable()
export class CreatePostService {
  constructor(
    @Inject('PostRepository') // 🔥 Garante que a injeção funcione
    private readonly repository: PostRepository,
  ) {}

  async execute(data: CreatePostDto): Promise<PostDto> {

    return this.repository.create(data);
  }
}
