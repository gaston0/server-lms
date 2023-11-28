import { Redis } from "ioredis";
require("dotenv").config();


const redisClient = () => {
    if(process.env.REDIS_URL){
        console.log(`Redis conncted`);
        return process.env.REDIS_URL
    }
    throw new Error(`Redis not connected`)
}


export const  redis = new Redis(redisClient());