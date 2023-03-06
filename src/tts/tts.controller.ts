import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Request,
} from '@nestjs/common';
import { TransformTextDto } from './dto/transform-text.dto';
import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post('/transform-text')
  transformText(@Request() req, @Body() transformTextDto: TransformTextDto) {
    return this.ttsService.transformText(transformTextDto, req.user.userId);
  }
}
