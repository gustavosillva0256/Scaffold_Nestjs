// update-post.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common'; // Adicione o Inject aqui
import { UpdatePostDto } from 'src/dtos/post/dto/update-post.dto';
import { PostRepository } from '../interfaces/post.interface';

@Injectable()
export class UpdatePostService {
  constructor(
    @Inject('PostRepository')
    private readonly repository: PostRepository,
  ) {}

  async execute(id: string, data: UpdatePostDto) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Post não encontrado');
    }

    return this.repository.update(id, data);
  }
}