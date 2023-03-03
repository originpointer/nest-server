import { Injectable } from '@nestjs/common';
import * as STS from 'qcloud-cos-sts';
import * as COS from 'cos-nodejs-sdk-v5';
import { cosConfig } from 'src/config/cos.config';
import { TempSecretDto } from './dto/tmp-secret.dto';

@Injectable()
export class CosService {
  /**
   * 获取腾讯云COS的临时密钥
   */
  async getAuthorization(): Promise<TempSecretDto> {
    const config = cosConfig.useFactory();
    const shortBucketName = config.bucket.substr(
      0,
      config.bucket.lastIndexOf('-'),
    );
    const appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'));

    const policy = {
      version: '2.0',
      statement: [
        {
          action: config.allowActions,
          effect: 'allow',
          principal: { qcs: ['*'] },
          resource: [
            'qcs::cos:' +
              config.region +
              ':uid/' +
              appId +
              ':prefix//' +
              appId +
              '/' +
              shortBucketName +
              '/' +
              config.allowPrefix,
          ],
          // condition生效条件，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
          // 'condition': {
          //   // 比如限定ip访问
          //   'ip_equal': {
          //     'qcs:ip': '10.121.2.10/24'
          //   }
          // }
        },
      ],
    };

    return new Promise((resolve, reject) => {
      STS.getCredential(
        {
          secretId: config.secretId,
          secretKey: config.secretKey,
          proxy: config.proxy,
          durationSeconds: config.durationSeconds,
          endpoint: config.endpoint,
          policy: policy,
        },
        (err, tempKeys) => {
          const result: any = JSON.stringify(err || tempKeys) || {};
          if (err) {
            reject(err);
          }
          try {
            const data = JSON.parse(result);
            const { credentials, expiredTime, startTime } = data;
            resolve({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              ExpiredTime: expiredTime,
              StartTime: startTime,
            });
          } catch (error) {
            reject('cos临时密钥获取失败');
          }
        },
      );
    });
  }

  async cosTest() {
    const cos = new COS({
      getAuthorization: (options, callback) => {
        this.getAuthorization().then((tempSecretDto: TempSecretDto) => {
          callback(tempSecretDto);
        });
      },
    });
    const config = cosConfig.useFactory();

    cos.getObjectUrl(
      {
        Bucket: config.bucket,
        Region: config.region,
        Key: 'test.txt',
        Sign: true,
      },
      (err, data) => {
        if (err) {
          console.log('err', err);
        } else {
          const url = data.Url;
          console.log('url', url);
        }
      },
    );

    // cos.getBucket(
    //   {
    //     Bucket: config.bucket,
    //     Region: config.region,
    //   },
    //   (err, data) => {
    //     if (err) {
    //       console.log('err', err);
    //     } else {
    //       console.log('data', data);
    //     }
    //   },
    // );

    // cos.putObject(
    //   {
    //     Bucket: config.bucket,
    //     Region: config.region,
    //     Key: 'test.txt',
    //     Body: Buffer.from('hello world!'),
    //   },
    //   (err, data) => {
    //     if (err) {
    //       console.log('err', err);
    //     } else {
    //       console.log('data', data);
    //     }
    //   },
    // );
  }
}
