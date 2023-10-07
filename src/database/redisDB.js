import Ioredis from "ioredis";
import {redisConfig} from "../config/redisConfig";
const redisDB = (config = {}) => {
  if (JSON.stringify(config) === '{}') config = redisConfig()
  return   new Ioredis(config)
}


export default redisDB


