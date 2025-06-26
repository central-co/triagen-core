import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RoomServiceClient } from 'livekit-server-sdk';

@Module({})
export class LiveKitModule {
    static ROOM_SERVICE_CLIENT = 'ROOM_SERVICE_CLIENT';

    static forRoot(): DynamicModule {
        return {
            module: LiveKitModule,
            providers: [
                {
                    provide: LiveKitModule.ROOM_SERVICE_CLIENT,
                    useFactory: (configService: ConfigService) => {
                        const livekitUrl = configService.getOrThrow<string>('LIVEKIT_URL');
                        const livekitApiKey = configService.getOrThrow<string>('LIVEKIT_API_KEY');
                        const livekitApiSecret = configService.getOrThrow<string>('LIVEKIT_API_SECRET');

                        return new RoomServiceClient(
                            livekitUrl,
                            livekitApiKey,
                            livekitApiSecret,
                        );
                    },
                    inject: [ConfigService],
                },
            ],
            exports: [LiveKitModule.ROOM_SERVICE_CLIENT],
        };
    }
}
