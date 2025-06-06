import { GoogleGenAI } from "@google/genai";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({})
export class GeminiModule {
    static GEMINI_CLIENT = 'GEMINI_CLIENT';

    static forRoot(): DynamicModule {
        return {
            module: GeminiModule,
            providers: [
                {
                    inject: [ConfigService],
                    provide: GeminiModule.GEMINI_CLIENT,
                    useFactory: async (configService: ConfigService) => {
                        return new GoogleGenAI({
                            apiKey:  configService.get<string>('GEMINI_API_KEY'),
                        });
                    }
                }
            ],
            exports: [GeminiModule.GEMINI_CLIENT],
        }
    }
}
