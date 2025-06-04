import { Module } from "@nestjs/common";
import { RedisModule as NestRedisModule } from "@nestjs-modules/ioredis";

@Module({
    imports: [
        NestRedisModule.forRoot({
            type: 'single',
            options: {
                host: process.env.REDIS_HOST || 'localhost',
                port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
            }
        }),
    ],
    exports: [NestRedisModule],
})
export class RedisModule {}
