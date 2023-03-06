import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('stream')
  stream(@Res() response: Response) {
    const file = this.fileService.fileStream();
    file.pipe(response);
  }
}
