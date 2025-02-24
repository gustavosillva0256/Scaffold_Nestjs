import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../interfaces/post.interface';

@Injectable()
export class GetByIdPostService {
  constructor(
    @Inject('PostRepository')
    private readonly repository: PostRepository) {}

  async execute(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Post com ID ' + id + ' não encontrado.');
    return entity;
  }
}
