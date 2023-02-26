/**
 * 获取小程序全局唯一后台接口调用凭据，token有效期为7200s
 */
const AppSecretUrl = 'https://api.weixin.qq.com/cgi-bin/token';

/**
 * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。更
 */
const AppLogin = 'https://api.weixin.qq.com/sns/jscode2session';

export { AppSecretUrl, AppLogin };
