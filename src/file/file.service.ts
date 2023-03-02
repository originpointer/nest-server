import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  fileStream() {
    return createReadStream(join(process.cwd(), 'YourAudioFile.wav'));
  }
}
