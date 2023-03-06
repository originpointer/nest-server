import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { SpeechService } from 'src/tts-microsoft/speech.service';
import { CosService } from 'src/cos/cos.service';

@Module({
  controllers: [TtsController],
  providers: [TtsService, SpeechService, CosService],
})
export class TtsModule {}
