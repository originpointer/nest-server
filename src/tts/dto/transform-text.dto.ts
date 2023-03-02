import { IsNotEmpty, IsString } from 'class-validator';

export class TransformTextDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
