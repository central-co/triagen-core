import { Module } from "@nestjs/common";
import { RedisModule as NestRedisModule } from "@nestjs-modules/ioredis";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        NestRedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'single',
                options: {
                    host: configService.get<string>('REDIS_HOST', 'localhost'),
                    port: parseInt(configService.get<string>('REDIS_PORT', '6379'), 10),
                }
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [NestRedisModule],
})
export class RedisModule {}
