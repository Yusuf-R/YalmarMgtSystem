require('dotenv').config({
  path: '../server/.env',
});
const Redis = require('ioredis');

const url = process.env.REDIS_URL;

console.log({ redis: url });
const msg = 'Redis connection is not alive';

class RedisClient {
  constructor() {
    this.client = new Redis(url);
    this.client.on('error', (error) => {
      console.error(error);
    });
    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  async isAlive() {
    if (!await this.client.ping()) {
      return false;
    }
    return true;
  }

  async get(key) {
    try {
      if (!await this.isAlive()) {
        throw new Error(msg);
      }
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      throw new Error(error);
    }
  }

  async set(key, value, duration) {
    try {
      if (!await this.isAlive()) {
        throw new Error(msg);
      }
      await this.client.set(key, value, 'EX', duration);
    } catch (error) {
      throw new Error(error);
    }
  }

  async del(key) {
    try {
      if (!await this.isAlive()) {
        throw new Error(msg);
      }
      const ret = await this.client.del(key);
      return ret;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
