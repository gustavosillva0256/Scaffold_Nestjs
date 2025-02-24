import { Inject,Injectable } from '@nestjs/common';
import { PostRepository } from '../interfaces/post.interface';

@Injectable()
export class GetPostService {
  constructor(
    @Inject('PostRepository')
    private readonly repository: PostRepository,
  ) {}

  async execute() { 
    return this.repository.findAll(); 
  }
}
