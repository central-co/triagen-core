import { Message } from "@domain/entities/message.entity";
import { LLMService } from "@domain/interfaces/llm.inteface";
import { ChatRepository } from "@domain/repositories/chat.repository.interface";
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GenerateResponseUseCase {
    private readonly baseSystemPrompt: string;
    constructor(
        private readonly llm: LLMService,
        private readonly chatRepository: ChatRepository,
    ) {
        this.baseSystemPrompt = fs.readFileSync(path.resolve(__dirname, '../../../prompts/system.md'), 'utf-8');
    }

    async execute(message: Message): Promise<Message> {
        const context = await this.chatRepository.getMessages(message.from.id);
        if (context.length === 0) {
            throw new Error("Context cannot be empty");
        }

        let systemPrompt = this.baseSystemPrompt;
        console.log("Base system prompt:", systemPrompt);

        systemPrompt = systemPrompt.replace('{context}', context.slice(0, context.length - 1)
        .map((msg) => `${msg.from.name}: ${msg.text}`)
        .join("\n"));

        console.log("System prompt with context:", systemPrompt);
        console.log("Last message in context:", context[context.length - 1].text);

        const response = await this.llm.generateResponse(
                context[context.length - 1].text,
                systemPrompt
            )
        console.log("Response from LLM:", response);

        return new Message(
            '1',
            {
                id: message.from.id,
                name: 'Assistant',
            },
            Date.now(),
            'text',
            response,
        );

    }
}
