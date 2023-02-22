import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @IsString()
  readonly name: string;
  @IsInt()
  @ApiProperty({ example: 1 })
  readonly age: number;
  @IsString()
  @ApiProperty({
    example: 'Maine Coon',
  })
  readonly breed: string;
}
