import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RoomServiceClient } from "livekit-server-sdk";
import { config } from "process";

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
                        return new RoomServiceClient(
                            configService.get<string>('LIVEKIT_URL') || '',
                            configService.get<string>('LIVEKIT_API_KEY') || '',
                            configService.get<string>('LIVEKIT_API_SECRET') || '',
                        );
                    },
                    inject: [ConfigService],
                },
            ],
            exports: [LiveKitModule.ROOM_SERVICE_CLIENT],
        };
    }
}
