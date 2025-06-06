import { LLMService } from "@domain/interfaces/llm.inteface";
import { GoogleGenAI } from "@google/genai";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class GeminiLLMService extends LLMService {
    constructor(
        private readonly configService: ConfigService,
        @Inject('GEMINI_CLIENT') private readonly gemini: GoogleGenAI
    ) {
        super();
    }

    async generateResponse(prompt: string, context: string): Promise<string> {
        const response = await this.gemini.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                systemInstruction: context,
                maxOutputTokens: 2048,
            }

        })

        if (!response || !response.text) {
            return "I'm sorry, I cannot generate a response at this time.";
        }
        return response.text;
    }
}
