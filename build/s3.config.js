module.exports = {
  directory: 'dist/',
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.VUE_APP_AWS_S3_REGION,
  },
  s3UploadOptions: {
    Bucket: process.env.VUE_APP_AWS_S3_BUCKET,
  },
  cloudfrontInvalidateOptions: {
    DistributionId: process.env.VUE_APP_AWS_CLOUDFRONT_DISTRIBUTION_ID,
    Items: ['/*'],
  },
};
