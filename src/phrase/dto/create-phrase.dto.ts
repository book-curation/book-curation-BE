import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhraseDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
