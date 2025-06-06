import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Module({})
export class OpenAIModule {
    static OPENAI_CLIENT = 'OPENAI_CLIENT';

    static forRoot(): DynamicModule {
        return {
            module: OpenAIModule,
            providers: [
                {
                    inject: [ConfigService],
                    provide: OpenAIModule.OPENAI_CLIENT,
                    useFactory: async (configService: ConfigService) => {
                        return new OpenAI({
                            apiKey: configService.get<string>('OPENAI_API_KEY'),
                            baseURL: configService.get<string>('OPENAI_API_URL'),
                            timeout: 10000,
                        })
                    }
                }
            ],
            exports: [OpenAIModule.OPENAI_CLIENT],
        }
    }
}
