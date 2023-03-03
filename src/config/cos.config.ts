const cosConfig = {
  useFactory: () => {
    return {
      secretId: process.env.SECRET_ID,
      secretKey: process.env.SECRET_KEY,
      proxy: '',
      durationSeconds: 1800,
      // host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
      endpoint: 'sts.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com
      // 放行判断相关参数
      bucket: 'speaker-1316897509',
      region: 'ap-shanghai',
      allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
      // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
      allowActions: [
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload',
        // 下载操作
        'name/cos:GetObject',
        'name/cos:GetBucket',
      ],
    };
  },
};

export { cosConfig };
