import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { mongoDBConfig } from './config/db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TtsModule } from './tts/tts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongoDBConfig),
    CatsModule,
    UsersModule,
    AuthModule,
    TtsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
