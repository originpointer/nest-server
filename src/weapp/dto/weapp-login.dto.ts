import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WeappLoginDto {
  @IsString()
  @ApiProperty({ example: '' })
  readonly js_code: string;
}
