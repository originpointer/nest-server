import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete, UseGuards,
} from '@nestjs/common';
import { WeappService } from 'src/weapp/weapp.service';
import { AuthService } from './auth.service';
import { WeappLoginDto } from '../weapp/dto/weapp-login.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/weapp-login')
  async create(@Body() weappLoginDto: WeappLoginDto) {
    return await this.authService.weappLogin(weappLoginDto);
    // const sessionResponse = await this.weappService.weappLogin(weappLoginDto);
    // const dbUser = await this.authService.weappLogin(sessionResponse);
    // if (dbUser === undefined) {
    //   console.log('sodalog 建一个用户吧');
    //   await this.authService.create
    // }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
