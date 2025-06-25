import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Module({})
export class NodemailerModule {
    static NODEMAILER_CLIENT = 'NODEMAILER_TRANSPORTER';

    static forRoot(): DynamicModule {
        return {
            module: NodemailerModule,
            providers: [
                {
                    provide: NodemailerModule.NODEMAILER_CLIENT,
                    useFactory: async (
                        configService: ConfigService,
                    ): Promise<Transporter> => {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: configService.get<string>('EMAIL_USER'),
                                pass: configService.get<string>(
                                    'EMAIL_PASSWORD',
                                ),
                            },
                        });

                        await transporter.verify();
                        return transporter;
                    },
                    inject: [ConfigService],
                },
            ],
            exports: [NodemailerModule.NODEMAILER_CLIENT],
        };
    }
}
