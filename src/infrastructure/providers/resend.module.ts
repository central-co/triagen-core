import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Resend } from 'resend';

@Module({})
export class ResendModule {
    static RESEND_CLIENT = 'RESEND_CLIENT';

    static forRoot(): DynamicModule {
        return {
            module: ResendModule,
            providers: [
                {
                    provide: ResendModule.RESEND_CLIENT,
                    useFactory: (configService: ConfigService): Resend => {
                        return new Resend(configService.getOrThrow<string>('RESEND_API_KEY'));
                    },
                    inject: [ConfigService],
                },
            ],
            exports: [ResendModule.RESEND_CLIENT],
        };
    }
}
