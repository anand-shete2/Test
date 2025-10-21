const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// the IAM user only needs PutObject policy
const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const putObjectForProfile = async type => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `users/profile/${Math.random()}`,
    ContentType: type,
  });
  return await getSignedUrl(client, command, { expiresIn: 600 });
};

const putObjectForBlog = async () => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `users/blogs/${Math.random()}`,
  });
  return await getSignedUrl(client, command, { expiresIn: 600 });
};

module.exports = { putObjectForProfile, putObjectForBlog };
