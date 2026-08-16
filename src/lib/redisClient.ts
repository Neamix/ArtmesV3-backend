import "dotenv/config";
import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (error) => console.error("Redis redisClient Error", error));

await redisClient.connect();

export default redisClient;
