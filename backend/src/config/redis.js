const Redis = require("ioredis");
let redis;

try {
  redis = new Redis(process.env.REDIS_URI);

  redis.on("connect", () => console.log("Redis connected"));
  redis.on("error", error => console.log("Redis connection error", error));
} catch (error) {
  console.log("Failed to initalize Redis: ", error);
}

module.exports = { redis };
