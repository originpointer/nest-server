import { Injectable } from '@nestjs/common';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import {generateRandomFilename, generateUsername} from "../utils";
import * as path from "path";
import * as nodeProcess from "process";
import * as fs from "fs";
import process from "process";

@Injectable()
export class SpeechService {
  constructor() {}

  async speakTextAsync(text: string, voiceName = 'zh-cn-XiaochenNeural') {
    const randomName = generateRandomFilename();
    console.log('randomName', randomName);
    const tmpFolderPath = path.join(nodeProcess.cwd(), 'tmp');
    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath)
    }
    const audioFile = path.join(nodeProcess.cwd(), `tmp/${randomName}.wav`);
    
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      nodeProcess.env.SPEECH_KEY,
      nodeProcess.env.SPEECH_REGION,
    );

    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
    speechConfig.speechSynthesisVoiceName = voiceName;
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(text, (result) => {
        synthesizer.close();
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          return resolve({
            name: randomName,
            ext: 'wav'
          });
        } else {
          return reject('synthesis error');
        }
      });
    });
  }
}
