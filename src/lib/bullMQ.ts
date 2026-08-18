import { createNodeRedisClient } from 'bullmq';
import redisClient from './redisClient.js';

const bullconnection = createNodeRedisClient(redisClient);

export default bullconnection;