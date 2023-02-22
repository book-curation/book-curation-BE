import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePhraseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
