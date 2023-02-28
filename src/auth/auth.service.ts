import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { WeappLoginDto } from 'src/weapp/dto/weapp-login.dto';
import { WeappService } from 'src/weapp/weapp.service';
import { JwtService } from '@nestjs/jwt';
import { generateUsername } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly weappService: WeappService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 小程序登陆
   * @param weappLoginDto
   */
  async weappLogin(weappLoginDto: WeappLoginDto) {
    const sessionResponse = await this.weappService.weappLogin(weappLoginDto);
    const { openid } = sessionResponse;
    let dbUser = await this.usersService.findByOpenId(openid);
    if (!dbUser) {
      console.log('sodalog 创建新用户');
      dbUser = await this.usersService.create({
        username: generateUsername(),
        password: '',
        openid,
      });
    }

    console.log('dbUser', dbUser);
    const { username, _id } = dbUser;

    console.log('_id', _id.toString());
    return {
      access_token: this.jwtService.sign({
        username,
        userId: _id.toString(),
      }),
    };
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
