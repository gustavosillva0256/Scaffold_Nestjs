import { PostDto } from 'src/dtos/post/dto/post.dto';
import { CreatePostDto } from 'src/dtos/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/dtos/post/dto/update-post.dto';

export interface PostRepository {
  create(data: CreatePostDto): Promise<PostDto>;
  findAll(): Promise<PostDto[]>;
  findById(id: string): Promise<PostDto | null>;
  update(id: string, data: UpdatePostDto): Promise<PostDto>;
  delete(id: string): Promise<PostDto>;
  
}
