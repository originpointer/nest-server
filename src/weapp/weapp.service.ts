import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { AppLogin, AppSecretUrl } from 'src/api/weapp';
import { WeappLoginDto } from './dto/weapp-login.dto';

@Injectable()
export class WeappService {
  appSecret = '';
  constructor(private readonly httpService: HttpService) {
    this.updateAppSecret();
  }

  updateAppSecret() {
    const url = new URL(AppSecretUrl);
    url.searchParams.append('grant_type', 'client_credential');
    url.searchParams.append('appid', process.env.APP_ID);
    url.searchParams.append('secret', process.env.SECRET);

    this.httpService.get(url.toString()).subscribe((response: any) => {
      const { data } = response;
      const errCode = _.get(data, 'errcode', 0);
      const errmsg = _.get(data, 'errmsg', '');

      if (errCode !== 0) {
        console.log('errmsg:', errmsg);
      } else {
        const accessToken = _.get(data, 'access_token', '');
        const expiresTime = _.get(data, 'expires_in', 0);
        this.appSecret = accessToken;
        if (expiresTime > 0) {
          setTimeout(this.updateAppSecret.bind(this), (expiresTime - 1) * 1000);
        }
      }
    });
  }

  getAppSecret() {
    return this.appSecret;
  }

  /**
   * 调用腾讯小程序登陆
   * @param weappLoginDto
   * @returns
   */
  async weappLogin(weappLoginDto: WeappLoginDto): Promise<any> {
    const url = new URL(AppLogin);
    url.searchParams.append('appid', process.env.APP_ID);
    url.searchParams.append('secret', process.env.SECRET);
    url.searchParams.append('js_code', weappLoginDto.js_code);
    url.searchParams.append('grant_type', 'authorization_code');

    return new Promise((resolve) => {
      this.httpService.get(url.toString()).subscribe((response: any) => {
        // openid 用户唯一标识
        resolve(response.data);
      });
    });
  }
}
