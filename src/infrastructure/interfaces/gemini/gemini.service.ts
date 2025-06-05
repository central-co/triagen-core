import { Injectable } from '@nestjs/common';
import { LanguageModelService } from '@domain/interfaces/language-model.service.interface';
import { Message } from '@domain/entities/message.entity';

@Injectable()
export class GeminiService extends LanguageModelService {
    async generateReply(messages: Message[]): Promise<string> {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not defined');
        }
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const contents = messages.map((m) => ({
            role: 'user',
            parts: [{ text: m.text }],
        }));

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents }),
            });
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
                throw new Error('Invalid response from Gemini API');
            }
            return text;
        } catch (error) {
            console.error('Gemini API error:', error);
            throw new Error('Failed to generate reply');
        }
    }
}
