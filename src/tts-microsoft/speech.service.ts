import { Injectable } from '@nestjs/common';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

@Injectable()
export class SpeechService {
  constructor() {}

  async speakTextAsync(text: string, voiceName = 'zh-cn-XiaochenNeural') {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.SPEECH_KEY,
      process.env.SPEECH_REGION,
    );

    const audioFile = 'YourAudioFile.wav';
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
    speechConfig.speechSynthesisVoiceName = voiceName;
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(text, (result) => {
        synthesizer.close();
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('synthesis finished');
          resolve('succcess');
        } else {
          console.log('synthesis error');
          reject('synthesis error');
        }
      });
    });
  }
}
