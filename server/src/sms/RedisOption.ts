const RedisOption = {
  name: 'authcode',
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};

export default RedisOption;
