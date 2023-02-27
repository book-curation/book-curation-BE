import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Book } from 'src/books/entity/book.entity';
import { User } from 'src/users/entity/user.entity';

export class CreateCurationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  @IsArray()
  bookIdList: number[];

  @IsNotEmpty()
  @IsString()
  userId: string;
}
