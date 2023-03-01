import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
