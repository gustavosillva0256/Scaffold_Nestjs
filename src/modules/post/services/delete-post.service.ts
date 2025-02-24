// delete-post.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common'; // Adicione o Inject aqui
import { PostRepository } from '../interfaces/post.interface';

@Injectable()
export class DeletePostService {
  constructor(
    @Inject('PostRepository')
    private readonly repository: PostRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Post não encontrado.');

    return this.repository.delete(id);
  }
}