import { Injectable } from '@nestjs/common';
import { SpeechService } from 'src/tts-microsoft/speech.service';
import { TransformTextDto } from './dto/transform-text.dto';

@Injectable()
export class TtsService {
  constructor(private readonly speechService: SpeechService) {}
  async transformText(transformTextDto: TransformTextDto) {
    const { text } = transformTextDto;
    console.log('text', text);
    return await this.speechService.speakTextAsync(text);
  }
}
