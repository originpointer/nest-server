import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WeappLoginDto } from '../weapp/dto/weapp-login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/weapp-login')
  async create(@Body() weappLoginDto: WeappLoginDto) {
    return await this.authService.weappLogin(weappLoginDto);
  }

  @Public()
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
  @Get('/info')
  async getCurrentUserInfo(@Request() req) {
    return req.user;
  }
}
