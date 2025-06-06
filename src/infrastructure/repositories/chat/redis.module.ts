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
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                },
            }),
        }),
    ],
    exports: [NestRedisModule],
})
export class RedisModule {}
