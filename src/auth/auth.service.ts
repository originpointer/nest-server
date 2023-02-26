import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { WeappLoginDto } from 'src/weapp/dto/weapp-login.dto';
import { WeappService } from 'src/weapp/weapp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly weappService: WeappService,
  ) {}

  /**
   * 小程序登陆
   * @param weappLoginDto
   */
  async weappLogin(weappLoginDto: WeappLoginDto) {
    const sessionResponse = await this.weappService.weappLogin(weappLoginDto);
    const { openid } = sessionResponse;
    console.log('openid', openid);
    let dbUser = await this.usersService.findByOpenId(openid);
    console.log('dbUser', dbUser);
    if (!dbUser) {
      console.log('sodalog 创建新用户');
      dbUser = await this.usersService.create({
        username: '',
        password: '',
        openid,
      });
    }

    console.log('dbUser', dbUser);
  }
}
