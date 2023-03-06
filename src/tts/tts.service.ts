import { Injectable } from '@nestjs/common';
import { SpeechService } from 'src/tts-microsoft/speech.service';
import { CosService } from 'src/cos/cos.service';
import { TransformTextDto } from './dto/transform-text.dto';
import { generateUsername } from '../utils';
import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';

@Injectable()
export class TtsService {
  constructor(
    private readonly speechService: SpeechService,
    private readonly cosService: CosService,
  ) {}
  async transformText(transformTextDto: TransformTextDto, userId: string) {
    const { text } = transformTextDto;

    // const tmpFolderPath = path.join(process.cwd(), 'tmp');
    // if (!fs.existsSync(tmpFolderPath)) {
    //   fs.mkdirSync(tmpFolderPath)
    // }
    //
    // const tmpFilePath = path.join(process.cwd(), `tmp/${randomName}.wav`);

    // 文本内容生成md5
    // 拼接文件全路径
    // 判断文件是否存在
    // 若存在 直接返回成功
    // 若不存在 调用接口创建文件

    const result = await this.speechService.speakTextAsync(text, userId);
    console.log(result);
    const { filepath, key } = result as any;
    if (filepath) {
      const result = await this.cosService.putObject(filepath, key);
      console.log('result', result);
      const urlData: any = await this.cosService.getObjectUrl(key);
      console.log('urlData', urlData);
      const { Url } = urlData;

      return {
        url: Url,
      };
    }
  }
}
