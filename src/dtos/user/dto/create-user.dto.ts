
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString} from 'class-validator'




export class CreateUserDto {
  @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
email: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
name?: string  | null;
}
