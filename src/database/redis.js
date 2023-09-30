import Ioredis from "ioredis";
import {redisConfig} from "../config/redisConfig";
const redis = (config = {}) => {
  if (JSON.stringify(config) === '{}') config = redisConfig()
  return   new Ioredis(config)
}


export default redis


