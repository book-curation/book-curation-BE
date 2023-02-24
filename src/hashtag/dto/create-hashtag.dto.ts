import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHashtagDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  content: string[];
}
