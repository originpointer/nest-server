export class TempSecretDto {
  // 临时密钥的 tmpSecretId
  TmpSecretId: string;
  // 临时密钥的 tmpSecretKey
  TmpSecretKey: string;
  // 临时密钥的 sessionToken
  SecurityToken: string;
  // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSecond
  ExpiredTime: number;
  StartTime: number;
}
