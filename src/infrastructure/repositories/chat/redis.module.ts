import { Module } from "@nestjs/common";
import { RedisModule as NestRedisModule } from "@nestjs-modules/ioredis";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        NestRedisModule.forRootAsync({
            inject: [
                ConfigService,
            ],
            useFactory: (configService: ConfigService) => ({
                type: 'single',
                options: {
                    host: configService.get<string>('redis.host'),
                    port: configService.get<number>('redis.port'),
                },
            }),
        }),
    ],
    exports: [NestRedisModule],
})
export class RedisModule {}
