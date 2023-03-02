import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { SpeechService } from 'src/tts-microsoft/speech.service';

@Module({
  controllers: [TtsController],
  providers: [TtsService, SpeechService],
})
export class TtsModule {}
