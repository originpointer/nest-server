import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { HttpModule } from '@nestjs/axios';
import { CosService } from 'src/cos/cos.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [CatsService, CosService],
  controllers: [CatsController],
})
export class CatsModule {}
